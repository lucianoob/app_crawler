# APP Crawler

Teste de um app de crawler de uma pesquisa no Mercado Livre.

## Pré-Requisitos

Para rodar o projeto deve-se utilizar os seguintes requisitos:
- Nodejs 
- NPM

## Componentes

Os componentes utilizados neste projeto são:
- Nodejs v10.20.1
- NPM v6.14.4
- Axios v0.19.2
- Express v4.17.1
- Cheerio v1.0.0-rc.3


## Instalação

Para instalar basta rodar os comandos abaixo, lembrando que é necessário ter todos os pré-requisitos instalados.
- npm i
- node index.js
- Acesse [http://localhost:3000](http://localhost:3000)

## Funcionalidades

Este teste tem as seguintes funcionalidades:
- Foi desenvolvida uma API para realizar buscas no Mercado Livre que retorna a lista de resultados em JSON;
- A busca pode ser feita tanto com GET quanto com POST, sendo utilizada a variável **search**;
- Pode ser utilizado um limitador de resultado usando a variável **limit**;
- Pode ser utilizada uma paginação dos resultado usando a variável **page**;
- Algumas informações sobre a busca podem ser visualizadas no console do Node;
- E a forma desenvolvida foi pensada em permitir a fácil expansão das informações dos itens de resultado.