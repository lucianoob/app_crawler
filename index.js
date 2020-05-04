const packages = require('./package.json');
const express = require('express');
const bodyParser     =        require("body-parser");
const axios = require('axios');
const cheerio = require('cheerio');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('/', (req, res) => {
	let limit = 10, page = 1, search = null;
	if(Object.keys(req.query).length) {
		limit = req.query.limit || 10;
		page = req.query.page || 1;
		search = req.query.search || null;
	} else if(req.body) {
		console.log(req.body);
		limit = req.body.limit || 10;
		page = req.body.page || 1;
		search = req.body.search || null;
	}
	console.log('[app_crawler] ['+(new Date().toLocaleString('pt-BR'))+'] query: limit | '+limit);
	console.log('[app_crawler] ['+(new Date().toLocaleString('pt-BR'))+'] query: page | '+page);
	console.log('[app_crawler] ['+(new Date().toLocaleString('pt-BR'))+'] query: search | '+search);
    if(search) {
		let results = [];
    	axios.get('https://lista.mercadolivre.com.br/'+search)
		.then((response) => {
			let html = response.data;
			let $ = cheerio.load(html); 
			$('.results-item').slice(limit*(page-1),limit*page).each(function(i, elem) {
				let installments = $(this).find('.item-installments').text().trim().replace('   sem juros', '');
				let result = {
					name: $(this).find('.item__title').text().trim(),
					price: $(this).find('.item__price > .price__fraction').text().trim()+','+$(this).find('.item__price > .price__decimals').text().trim(),
					currency: $(this).find('.item__price > .price__symbol').text().trim(),
					installments: installments.slice(0,installments.length-3)+','+installments.slice(-2),
					link: $(this).find('a').attr("href"),
					image: $(this).find('.item__image').find('img').attr('src')
				};
				results.push(result);
			});
			let requests = [];
			results.forEach((result) => {
				requests.push(axios.get(result.link));
			});
			axios.all(requests).then(axios.spread((...responses) => {
		 		responses.forEach((response, index) => {
		 			let $$ = cheerio.load(response.data);
		 			results[index].conditions = $$('.layout-description-wrapper').find('.item-conditions').text().trim();		 			
		 			results[index].store = $$('.vip-section-seller-info').find('a').attr('href').replace('https://perfil.mercadolivre.com.br/', '').replace('+',' ');		 			
		 			results[index].store_info = {
		 				link: $$('.vip-section-seller-info').find('a').attr('href'),
		 				reputation: $$('.reputation-relevant').find('strong').text().trim(),
		 			};
		 		});
		 		return res.json(results);
			})).catch(errors => {
				console.log('[app_crawler] ['+(new Date().toLocaleString('pt-BR'))+'] error', errors);
			});
		})
		.catch((error) => {
			console.log('[app_crawler] ['+(new Date().toLocaleString('pt-BR'))+'] error', errors);
		});
    } else {
    	return res.json([]);
    }
});

app.listen(3000, () => {
    console.log('\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    console.log('@ APP Crawler ['+packages.version+']: listening on port 3000...');
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
});