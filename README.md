<img src="src/assets/dropdown.png" width=400 height=200/><img src="src/assets/detail.png" width=400 height=200/><img src="src/assets/search.png" width=400 height=200/><img src="src/assets/signin.png" width=400 height=200/><img src="src/assets/home.png" height=500/>

# Bem Vindo ao MovieDB React App

## Projeto desenvolvido com React + Styled Components + MovieDB API

https://avonale-tmdb.herokuapp.com/

## Tecnologias utilizadas

- React
- React Router Dom
- Context API
- Styled-components
- Testing Library

## Instruções de Instalação

1. Clone o repositorio

`https://github.com/marcusjava/avonale-tmdb`

2. Instalação
   Pré-requisitos: NodeJS instalado `https://nodejs.org/en/`

- Instalar dependencias - `yarn install`
- Criar conta no site https://www.themoviedb.org
- Gerar key para acesso a API em https://www.themoviedb.org/settings/api
- Criar arquivo .env na raiz do projeto com a seguinte variavel `REACT_APP_MOVIEDB_API_KEY="KEY GERADA"`
- Iniciar projeto - `yarn start`

## Usando Docker

- Construir imagem: docker build -t nome . no diretorio do dockerfile
- Testando imagem: docker run -p 80:80 noma_imagem
- Abra o navegador e digite http://localhost
