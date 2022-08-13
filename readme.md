# API Coleta seletiva de lixo

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Mongodb](https://img.shields.io/badge/mongodb-6DA55F?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)


# API para cadastro de pontos de coleta de lixo seletivo

API foi **desenvolvida** ultilzando uma arquitetura bem definida e desacoplada, ultilizando **TDD** como metotologia de trabalho e **Clean Architecture** para fazer a distribição das resposabildades em camadas, e sempre que possível ultilizando os principios do **SOLID**.

API conciste em um mapeamento onde estão situados **Pontos epecíficos** de coleta de lixo seletivo, onde os usuários podem está cadastrando esses pontos atravez de coordenadas de latitude e longitude do local. Além das localizações, os items que os pontos podem recolher/coletar so podem ser cadastrados via **Administrador do sistema**.

A Aplicação está em constante desenvolvimento, cabendo sempre que possível novas funcionalidades.

### Instruções para rodar o projeto

Os requisitos necessários são:

- Node
- npm
- Mongodb

Faça o clone do projeto e rode o comando `npm install` para instalar as dependências.

~~~javascript
npm install
~~~

Subir o servidor de desenvolvimento atravéz do comando `npm run dev`

~~~javascript
npm run dev
~~~

Configurar as variáveis de ambiente criando um arquivo `.env` na raiz do projeto, e seguindo o examplo do arquivo `.env.example`.


## Testes

#### Rodar todos os testes

~~~javascript
npm test
~~~

#### Rodar testes de unidade

~~~javascript
npm run test:unit
~~~

#### Rodar testes de integração

~~~javascript
npm run test:integration
~~~

#### Rodar testes covarage

~~~javascript
npm run test:ci
~~~

## Documentação
**em desenvolvimento**

## Principais funcionalidades
- Cadastro
- Login
- Criar Itens
- Listar Itens
- Criar Localização
- Listar Localização

## Endpoints da aplicação

## Rota de Cadastro
~~~javascript
[POST] /api/v1/signup
~~~

## **Request body**
~~~javascript
{
   "name": "string",
   "email": "string",
   "password": "string",
   "passwordConfirmation": "string"
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)

~~~javascript
{
    "access_token": "string",
    "name": "string"
}
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~

## Rota de Login
~~~javascript
[POST] /api/v1/login
~~~

## **Request body**
~~~javascript
{
  "email": "string",
  "password": "string"
}
~~~

## **Responses**
![Generic badge](https://img.shields.io/badge/OK-200-<COLOR>.svg)

~~~javascript
{
    "access_token": "string",
    "name": "string"
}
~~~
![Generic badge](https://img.shields.io/badge/bad%20request-400-red)

~~~javascript
{
    "error": "string"
}
~~~

## Rota de Criar Item **private**

~~~javascript
[POST] /api/v1/item
~~~

### **Parameters in header**

~~~javascript
{
    "x-access-token": "string"
}
~~~

## **Request body**
~~~javascript
{
    "title": "string",
    "image": "string"
}
~~~

## **Responses**
### **success**
![Generic badge](https://img.shields.io/badge/No%20content-204-green)

### **error**

![Generic badge](https://img.shields.io/badge/Access%20denied-403-orange)
![Generic badge](https://img.shields.io/badge/Bad%20request-404-red)
![Generic badge](https://img.shields.io/badge/Internal%20Server%20Error-500-red)

~~~javascript
{
    "error": "string"
}
~~~

## Rota de Listar Itens **private**

~~~javascript
[GET] /api/v1/item
~~~

### **Parameters in header**

~~~javascript
{
    "x-access-token": "string"
}
~~~

## **Responses**
### **success**
![Generic badge](https://img.shields.io/badge/OK-200-green)

~~~javascript
[
  {
	"id": "string",
	"title": "string",
	"image": "string"
  }
]
~~~

### **error**

![Generic badge](https://img.shields.io/badge/Access%20denied-403-orange)
![Generic badge](https://img.shields.io/badge/Bad%20request-404-red)
![Generic badge](https://img.shields.io/badge/Internal%20Server%20Error-500-red)

~~~javascript
{
    "error": "string"
}
~~~

## Rota para criar Localização **private**

~~~javascript
[POST] /api/v1/location
~~~

### **Parameters in header**

~~~javascript
{
    "x-access-token": "string"
}
~~~

## **Request body**
~~~javascript
{
  	"name": "string",
	"email": "string",
	"latitude": number,
	"longitude": number,
	"city": "string",
	"uf": "string",
	"items": [
		{ "id": "string"},
		{ "id": "string"},
	]
}
~~~

## **Responses**
### **success**
![Generic badge](https://img.shields.io/badge/nocontent-204-green)

~~~javascript
{
  "surveyId": "string",
  "question": "string",
  "answers": [
    {
      "image": "string",
      "answer": "string",
      "count": number,
      "percent": number,
      "isCurrentAccountAnswer": boolean
    }
  ],
  "date": "string"
}
~~~

### **error**

![Generic badge](https://img.shields.io/badge/Access%20denied-403-orange)
![Generic badge](https://img.shields.io/badge/Bad%20request-404-red)
![Generic badge](https://img.shields.io/badge/Internal%20Server%20Error-500-red)

~~~javascript
{
    "error": "string"
}
~~~

## Rota para consultar uma localização por id

~~~javascript
[GET] /api/v1/location/{locationId}
~~~

## **Parameters in route**

~~~javascript
{
"locationId": "string"
}
~~~

## **Responses**
### **success**
![Generic badge](https://img.shields.io/badge/OK-200-green)

~~~javascript
{
    "id": "string",
  	"location": {
		"name": "string",
		"email": "string",
		"latitude": number,
		"longitude": number,
		"city": "string",
		"uf": "string"
	},
	"items": [
		{
			"title": "string"
		},
		{
			"title": "string"
		}
	],
}
~~~

![Generic badge](https://img.shields.io/badge/Bad%20request-404-red)
![Generic badge](https://img.shields.io/badge/Internal%20Server%20Error-500-red)

~~~javascript
{
    "error": "string"
}
~~~

## Rota para consultar uma localização por filtros, uf, city.

~~~javascript
[GET] /api/v1/location
~~~

## **Responses**
### **success**
![Generic badge](https://img.shields.io/badge/OK-200-green)

~~~javascript
[
    {
        "id": "string",
      	"location": {
    		"name": "string",
    		"email": "string",
    		"latitude": number,
    		"longitude": number,
    		"city": "string",
    		"uf": "string"
    	},
    	"items": [
    		{
    			"title": "string"
    		},
    		{
    			"title": "string"
    		}
    	],
    }
]
~~~

~~~javascript
[GET] /api/v1/location?city={city}&uf={uf}
~~~

## **Parameters in query string**

~~~javascript
{
"city": "string",
"uf": "string"
}
~~~

## **Responses**
### **success**
![Generic badge](https://img.shields.io/badge/OK-200-green)

~~~javascript
[
    {
        "id": "string",
      	"location": {
    		"name": "string",
    		"email": "string",
    		"latitude": number,
    		"longitude": number,
    		"city": "string",
    		"uf": "string"
    	},
    	"items": [
    		{
    			"title": "string"
    		},
    		{
    			"title": "string"
    		}
    	],
    }
]
~~~

![Generic badge](https://img.shields.io/badge/Bad%20request-404-red)
![Generic badge](https://img.shields.io/badge/Internal%20Server%20Error-500-red)

~~~javascript
{
    "error": "string"
}
~~~
