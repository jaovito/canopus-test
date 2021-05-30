<h1 align="center">Carrossel da Saúde (Front-end)</h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação-e-configuração">Instalação e configuração</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<br>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [NextJS](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org)
- [Sass](https://sass-lang.com)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)



## 💻 Projeto

O front-end do projeto carrossel da saúde tem como informar o usuário sobre o COVID utilizando carroseis, cards e uma seção de informação, também tem um painel administrativo onde é possível realizar o login para adicionar imagens que farão parte do carrossel no front-end, nele você pode enviar suas imagens junto com um título e descrição, também é possível edita-las e exclui-las.

Esse projeto foi desenvolvido para avaliação de teste da Canopus Tecnologia & Inovação. Nele foi utilizado TypeScript para melhor experiência de desenvolvimento, NextJS framework para desenvolvimento, visto o curto prazo e suas vantagens.


## 🚀 Instalação e configuração
Primeiro você precisa clonar o repositório em uma pasta de sua preferência, já dentro da pasta execute o comando:
```sh
$ git clone https://github.com/jaovito/canopus-test.git canopus-test
```

Após clonar o repósitório você precisa acessar a pasta clonada e rodar e instalas as dependências, como no exemplo abaixo:

```sh
$ cd canopus-test/web
```

```sh
$ npm install # ou yarn install
```

Assim que todas as bibliotecas forem instaladas é só buscar pelo arquivo next.config.js e alterar as variáveis ambientes e localização das imagens (localhost:3333 por padrão):

```js
module.exports = {
  images: {
    domains: ['localhost:3333']
  },
  env: {
    URL: 'http://localhost:3333',
  },
}

```

Em desenvolvimento a rota e porta da api é http://localhost:3333.

Com todas as dependências instaladas e as variáveis ambiente configuradas, basta rodar o seguinte comando para iniciar o servidor em desenvolvimento:
```sh
$ npm run dev # ou yarn dev
```
