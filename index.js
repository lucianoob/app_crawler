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
			$('.ui-search-result__wrapper').slice(limit*(page-1),limit*page).each(function(i, elem) {
				let price_decimal = $(this).find('.ui-search-price.ui-search-price--size-medium > .ui-search-price__second-line').find('.price-tag-fraction').text().trim();
				let price_decimal_separator = $(this).find('.ui-search-price.ui-search-price--size-medium > .ui-search-price__second-line').find('.price-tag-decimal-separator').text().trim();
				let price_cents = $(this).find('.ui-search-price.ui-search-price--size-medium > .ui-search-price__second-line').find('.price-tag-cents').text().trim();
				let price_symbol = $(this).find('.ui-search-price.ui-search-price--size-medium > .ui-search-price__second-line').find('.price-tag-symbol').text().trim();
				let installments = $(this).find('.ui-search-item__group__element.ui-search-installments').text().replace(/[sem|juros]/g, '').trimEnd();

				let result = {
					name: $(this).find('.ui-search-item__title').text().trim(),
					price: price_decimal+price_decimal_separator+price_cents,
					currency: price_symbol,
					installments: installments,
					link: $(this).find('a').attr("href"),
					image: $(this).find('.ui-search-result__image').find('img').attr('src')
				};
				results.push(result);
			});
			return res.json(results);
		})
		.catch((error) => {
			console.log('[app_crawler] ['+(new Date().toLocaleString('pt-BR'))+'] error', error);
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