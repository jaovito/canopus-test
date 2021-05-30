<h1 align="center">Carrossel da Saúde</h1>

<br>

## ✨ Tecnologias

+ [Back-end](https://github.com/jaovito/canopus-test/tree/main/backend)
+ [Front-end](https://github.com/jaovito/canopus-test/tree/main/web)

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [AdonisJS](https://adonisjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [PostgreSQL](https://www.postgresql.org)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)
- [Nextjs](https://nextjs.org)
- [Sass](https://sass-lang.com)


## 🚀 Instalação e configuração
Primeiro você precisa clonar o repositório em uma pasta de sua preferência, já dentro da pasta execute o comando:
```sh
$ git clone https://github.com/jaovito/canopus-test.git
```

Após clonar o repósitório você precisa acessar a pasta clonada e rodar o comando:
```sh
$ npm install # ou yarn install
```

Assim que todas as bibliotecas forem instaladas é só buscar pelo arquivo .env.example na pasta **backend** e substituir seu nome por ".env" apenas, além disso deve alterar o conteúdo das variáveis ambiente, como no exemplo abaixo:

```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=qZdeqnVFeLZR87FzSyM96MekhvGnYVU2

ADM_USER=adm@teste.com

# sqlite or pg
DB_CONNECTION=sqlite
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=docker
PG_DB_NAME=carrossel
```

                
Lembrando que deve substituir as informações do banco de dados pela informação de autenticação do seu banco instalado, caso utilize o sqlite não precisa mudar nada. 

Em desenvolvimento a rota e porta da api é http://localhost:3333.

Com todas as dependências instaladas e as variáveis ambiente configuradas, basta rodar o seguinte comando para iniciar o servidor em desenvolvimento:
```sh
$ npm run dev # ou yarn dev
```
