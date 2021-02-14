# APP Crawler

Teste de um app de crawler de uma pesquisa no Mercado Livre.

## Pré-Requisitos

Para rodar o projeto deve-se utilizar os seguintes requisitos:
- Nodejs 
- NPM

## Componentes

Os componentes utilizados neste projeto são:
- Nodejs v14.15.5
- NPM v6.14.11
- Axios v0.21.1
- Express v4.17.1
- Cheerio v1.0.0-rc.5


## Instalação

Para instalar basta rodar os comandos abaixo, lembrando que é necessário ter todos os pré-requisitos instalados.
- npm i
- npm start
- Acesse [http://localhost:8080?search=produto&limit=10&page=1](http://localhost:8080?search=produto&limit=10&page=1)

## Funcionalidades

Este teste tem as seguintes funcionalidades:
- Foi desenvolvida uma API para realizar buscas no Mercado Livre que retorna a lista de resultados em JSON;
- A busca pode ser feita tanto com GET quanto com POST, sendo utilizada a variável **search**;
- Pode ser utilizado um limitador de resultado usando a variável **limit** (padrão: 10);
- Pode ser utilizada uma paginação dos resultado usando a variável **page** (padrão: 1);
- Algumas informações sobre a busca podem ser visualizadas no console do Node;
- E a forma desenvolvida foi pensada em permitir a fácil expansão das informações dos itens de resultado.

### Demonstração
Acesse um exemplo do app publicado no Google Cloud:
- [https://app-crawler.lucianob.app/?search=caneco](https://app-crawler.lucianob.app/?search=caneco)

## Telas

### Console da Busca da Palavra Cadeado
![Tela de Busca da Palavra Caneco](/images/app_crawler-01.png)

### Busca da Palavra **Cadeado**
![Tela Console da Busca da Palavra Caneco](/images/app_crawler-02.png)
