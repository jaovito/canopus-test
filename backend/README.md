<h1 align="center">Carrossel Feliz</h1>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação-e-configuração">Instalação e configuração</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rotas">Rotas</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

<br>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [AdonisJS](https://adonisjs.com)
- [TypeScript](https://www.typescriptlang.org)
- [PostgreSQL](https://www.postgresql.org)
- [Eslint](https://eslint.org)
- [Prettier](https://prettier.io)



## 💻 Projeto

O projeto carrossel feliz tem como objetivo o cadastro de usuários, onde é possível realizar o login para adicionar imagens que farão parte do carrossel no front-end, nele você pode enviar suas imagens junto com um título e descrição, também é possível edita-las e exclui-las (se for um administrador).

Esse projeto foi desenvolvido para avaliação de teste da Canopus Tecnologia & Inovação. Nele foi utilizado TypeScript para melhor experiência de desenvolvimento, PostgreSQL como banco de dados, AdonisJS como framework para desenvolvimento, visto o curto prazo. Também utilizei upload de imagens junto com as informações necessárias com o carrossel.



## 🚀 Instalação e configuração
Primeiro você precisa clonar o repositório em uma pasta de sua preferência, já dentro da pasta execute o comando:
```sh
$ git clone https://github.com/jaovito/test.git
```

Após clonar o repósitório você precisa acessar a pasta clonada e rodar o comando:
```sh
$ npm install # ou yarn install
```

Assim que todas as bibliotecas forem instaladas é só buscar pelo arquivo .env.example e substituir seu nome por ".env" apenas, além disso deve alterar o conteúdo das variáveis ambiente, como no exemplo abaixo:

              PORT=3333
              HOST=0.0.0.0
              NODE_ENV=development
              APP_KEY=qZdeqnVFeLZR87FzSyM96MekhvGnYVU2
              DB_CONNECTION=pg
              PG_HOST=localhost
              PG_PORT=5432
              PG_USER=postgres
              PG_PASSWORD=docker
              PG_DB_NAME=canopus

              ADM_USER=adm@teste.com

                
Lembrando que deve substituir as informações do banco de dadis pela informação de autenticação do seu banco instalado. 

Em desenvolvimento a rota e porta da api é http://localhost:3333.

Com todas as dependências instaladas e as variáveis ambiente configuradas, basta rodar o seguinte comando para iniciar o servidor em desenvolvimento:
```sh
$ npm run dev # ou yarn dev
```


## 🛣 Rotas

## Coleção de Usuários [/users]

### Criar um usuário [POST]

Você pode cadastrar um usuário para efetuar login com ele

+ name (string) - Nome do usuário
+ email (string) - E-mail do usuário
+ password (string) - Senha do usuário


+ Request (application/json)

  + Body


```json
{
	"name": "John Doe",
	"email": "johndoe@example.com",
	"password": "123456"
}
```
            
            
+ Response 200 (application/json)
    + Body

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "id": "f6eaf02d-36a3-42bc-872b-e664d9fd9ec0",
  "created_at": "2021-05-27T11:40:54.813-03:00",
  "updated_at": "2021-05-27T11:40:54.813-03:00"
}
```
#

### Listar todos usuários [GET]

Você pode listar todos usuários (se for o adm e estiver logado com Bearer Token)

+ Request (application/json)

+ Response 200 (application/json)

    + Body


```json
{
  "user": [
    {
      "id": "f6eaf02d-36a3-42bc-872b-e664d9fd9ec0",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "remember_me_token": null,
      "created_at": "2021-05-27T11:40:54.813-03:00",
      "updated_at": "2021-05-27T11:40:54.813-03:00"
    },
    {
      "id": "b2dc5f8e-bf56-448a-8223-d7c82a07a0fe",
      "name": "joao",
      "email": "adm@mais-app.com",
      "remember_me_token": null,
      "created_at": "2021-05-26T12:26:14.391-03:00",
      "updated_at": "2021-05-26T12:26:14.391-03:00"
    },
    {
      "id": "8109242c-b6e3-45d4-a427-04b6eb138ea7",
      "name": "joao1",
      "email": "teste@gmail.com",
      "remember_me_token": null,
      "created_at": "2021-05-27T11:15:02.840-03:00",
      "updated_at": "2021-05-27T11:15:02.840-03:00"
    },
    {
      "id": "7a74feb8-089e-4b0d-82e5-f19004352cbb",
      "name": "joao",
      "email": "teste1@gmail.com",
      "remember_me_token": null,
      "created_at": "2021-05-25T16:55:45.842-03:00",
      "updated_at": "2021-05-25T16:55:45.868-03:00"
    },
    {
      "id": "39d7e8b5-cfab-4f2f-bde2-512e785e94b5",
      "name": "joao1",
      "email": "teste2@gmail.com",
      "remember_me_token": null,
      "created_at": "2021-05-27T11:39:36.664-03:00",
      "updated_at": "2021-05-27T11:39:36.664-03:00"
    }
  ],
  "admin": true
}
```

#

### Listar apenas um usuário [GET "/:id"]
Lista apenas um usuário onde é informado o ID no params (precisa ser ADM e estar logado com Bearer Token para listar)

+ id (params) - ID do usuário que será pesquisado

+ Request (application/json)

    + params

                id: f6eaf02d-36a3-42bc-872b-e664d9fd9ec0
                
                
+ Response 200 (application/json)

    + Body


```json
{
  "user": {
    "id": "f6eaf02d-36a3-42bc-872b-e664d9fd9ec0",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "remember_me_token": null,
    "created_at": "2021-05-27T11:40:54.813-03:00",
    "updated_at": "2021-05-27T11:40:54.813-03:00",
    "adm": null
  },
  "admin": false
}
```

#

### Alterar informações de um usuário [PUT "/:id"]
Altera informação de um usuário (nome ou senha), precisa ser um ADM ou o próprio usuário dono da conta (precisa estar logado com Bearer Token).

+ id (params) - ID do usuário que será alterado
+ name (string) - Novo nome
+ password (string) - Nova senha

+ Request (application/json)
  + params
   
   ```
   id: f6eaf02d-36a3-42bc-872b-e664d9fd9ec0
   ```
    
  + Body
  
  ```json
  {
    "name": "John Doe",
    "password": "123456"
  }
  ```

+ Reponse 200 (application/json)

  + Body


  ```json
   {
    "id": "f6eaf02d-36a3-42bc-872b-e664d9fd9ec0",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "remember_me_token": null,
    "created_at": "2021-05-27T11:40:54.813-03:00",
    "updated_at": "2021-05-27T11:56:14.335-03:00"
  }
  ```
  
#

### Deletar um usuário [DELETE "/:id"]
Deleta um usuário onde foi fornecido o ID (precisa ser ADM ou o próprio usuário dono da conta logado com Bearer Token).

+ id (params) - ID do usuário que deseja deletar

+ Request (application/json)

  + params


  ```
   id: f6eaf02d-36a3-42bc-872b-e664d9fd9ec0
  ```

+ Response 200 (application/json)
```
OK
```

#

## Coleção de Autenticação (Login) [/auth]

### Autenticar/Login [POST]
Faz login na aplicação e retorna o token para acesso.

+ email (string) - E-mail do usuário que já deve existir
+ password (string) - Senha do usuário

+ Request (application/json)

  + Body


  ```json
  {
    "email": "teste@gmail.com",
    "password": "123456"
  }
  ```

+ Response 200 (application/json)

    + Body


```json
{
  "token": {
    "type": "bearer",
    "token": "MzY.jG-0JyyJoczzsgef4jAaHlkbITGGHwl12Z0MAxaUmXXOU4J4mod9tVMsd5tO"
  },
  "user": {
    "id": "8109242c-b6e3-45d4-a427-04b6eb138ea7",
    "name": "joao1",
    "email": "teste@gmail.com",
    "remember_me_token": null,
    "created_at": "2021-05-27T11:15:02.840-03:00",
    "updated_at": "2021-05-27T11:15:02.840-03:00",
    "adm": null
  },
  "admin": false
 }
```
#

## Coleção de ADM's ["/adm"]

### Criar ADM [POST]
Cria um adm, o primeiro ADM deve ser a pessoa com e-mail contido na variável ambiente "ADM_USER", já que não terá nada no banco de dados, caso contrário não sera possível fazer a requisição, pois somente um ADM pode criar outro (precisa estar autenticado com o Bearer Token).

+ userId (string) - ID do usuário que deseja transformar em ADM

+ Request (application/json)
  
  + Body

```json
{
	"userId": "660dfe9d-c00f-4938-b86a-0253702da67f"
}
```


+ Response 200 (application/json)
  
  + Body

```json
{
  "user_id": "8109242c-b6e3-45d4-a427-04b6eb138ea7",
  "id": "9f9a6427-c1ef-4f73-bbe2-a870e9b6c1a3",
  "created_at": "2021-05-27T15:35:42.859-03:00",
  "updated_at": "2021-05-27T15:35:42.859-03:00"
}
```
#

### Listar os ADMS [GET]
Lista todos os adms cadastrados (precisa estar logado com Bearer Token)

+ Request (application/json)
+ Response 200 (application/json)

  + Body

```json
[
  {
    "id": "7b0bd637-1ac2-47c1-bfd2-5758ede44a62",
    "user_id": "7a74feb8-089e-4b0d-82e5-f19004352cbb",
    "created_at": "2021-05-26T12:30:29.422-03:00",
    "updated_at": "2021-05-26T12:30:29.422-03:00",
    "user": {
      "id": "7a74feb8-089e-4b0d-82e5-f19004352cbb",
      "name": "joao",
      "email": "teste1@gmail.com",
      "remember_me_token": null,
      "created_at": "2021-05-25T16:55:45.842-03:00",
      "updated_at": "2021-05-25T16:55:45.868-03:00"
    }
  },
  {
    "id": "9f9a6427-c1ef-4f73-bbe2-a870e9b6c1a3",
    "user_id": "8109242c-b6e3-45d4-a427-04b6eb138ea7",
    "created_at": "2021-05-27T15:35:42.859-03:00",
    "updated_at": "2021-05-27T15:35:42.859-03:00",
    "user": {
      "id": "8109242c-b6e3-45d4-a427-04b6eb138ea7",
      "name": "joao1",
      "email": "teste@gmail.com",
      "remember_me_token": null,
      "created_at": "2021-05-27T11:15:02.840-03:00",
      "updated_at": "2021-05-27T11:15:02.840-03:00"
    }
  }
]
```

#

### Mostrar um ADM [GET "/:id"]
Mostra um adm onde é informado o ID (precisa estar logado com Bearer Token).

+ id (param) - ID do adm que deseja ver

+ Request (application/json)
 
  + param

  ```
  id: 7b0bd637-1ac2-47c1-bfd2-5758ede44a62
  ```


+ Response 200 (application/json)

  + Body

```json
{
  "id": "7b0bd637-1ac2-47c1-bfd2-5758ede44a62",
  "user_id": "7a74feb8-089e-4b0d-82e5-f19004352cbb",
  "created_at": "2021-05-26T12:30:29.422-03:00",
  "updated_at": "2021-05-26T12:30:29.422-03:00",
  "user": {
    "id": "7a74feb8-089e-4b0d-82e5-f19004352cbb",
    "name": "joao",
    "email": "teste1@gmail.com",
    "remember_me_token": null,
    "created_at": "2021-05-25T16:55:45.842-03:00",
    "updated_at": "2021-05-25T16:55:45.868-03:00"
  }
}
```

#

### Deletar um ADM [DELETE "/:id"]
Deleta um ADM, não deleta o usuário, apenas tira seu poder de ADM (precisa estar logado com Bearer Token).

+ id (param) - ID do adm que deseja remover

+ Request (application/json)

  + param

  ```
  id: 7b0bd637-1ac2-47c1-bfd2-5758ede44a62
  ```

+ Response 200 (application/json)

  + No Body


#

## Coleção de upload de imagens ["/uploads"]

## Listar todas imagens [GET]
Lista todas imagens no banco de dador (precisa estar logado com Bearer Token).

+ Request (application/json)
+ Response (application/json)

  + Body

  ```json
  [
    {
      "id": "a8680112-2f34-4c29-81c8-c19974db82e5",
      "path": "1622130252340-image.png",
      "name": "Teste3",
      "description": "um teste ai",
      "created_at": "2021-05-27T12:44:12.344-03:00",
      "updated_at": "2021-05-27T12:44:12.344-03:00"
    },
    {
      "id": "6b6e7c7c-28f9-46f4-a0b0-04a346534783",
      "path": "1622130246391-image.png",
      "name": "Teste2",
      "description": "um teste ai",
      "created_at": "2021-05-27T12:44:06.401-03:00",
      "updated_at": "2021-05-27T12:44:06.401-03:00"
    },
    {
      "id": "43233939-72e7-4b61-b8bc-9ee0c470fe17",
      "path": "1622054565793-image.png",
      "name": "Teste1",
      "description": "um teste ai",
      "created_at": "2021-05-26T15:42:45.801-03:00",
      "updated_at": "2021-05-26T15:42:45.801-03:00"
    }
  ]
  ```

#

### Fazer upload da imagem [POST]
Envia as imagens e as armazenas na pasta tmp/uploads.

+ name (string) - Nome que deseja dar para a imagem (será mostrado no carrossel)
+ description (string) - Descrição da imagem
+ image (file) - Imagem a ser enviada

+ Request (application/json)

  + Multpart form

```
name: Teste3
description: um teste ai
image[]: <file>
```

+ Response 200 (application/json)

  + Body

```json
[
  {
    "path": "1622144426805-image.png",
    "name": "Teste3",
    "description": "um teste ai",
    "id": "4f02c99b-f75a-4894-a778-b8de5411d7b9",
    "created_at": "2021-05-27T16:40:26.815-03:00",
    "updated_at": "2021-05-27T16:40:26.815-03:00"
  }
]
```

#

### Mostrar uma imagem [GET "/:filename"]
Lista uma imagem já cadastrada.

+ filename (param) - Nome da imagem que deseja ver

+ Request (application/json)

  + Params

```
filename: 1622144426805-image.png
```

+ Response 200 (application/json)

  + Image Content


#

### Atualiza da imagem [PUT "/:id"]
Atualiza os dados de uma imagem, seja nome, descrição ou arquivo.

+ name (string) - Nome que deseja dar para a imagem (será mostrado no carrossel)
+ description (string) - Descrição da imagem
+ image (file) - Imagem a ser enviada

+ id (param) - ID do usuário que deseja alterar


+ Request (application/json)

  + Params

```
id: a8680112-2f34-4c29-81c8-c19974db82e5
```

  + Multpart form

```
name: Teste3
description: um teste ai
image[]: <file>
```

+ Response 200 (application/json)

  + Body

```json
{
  "id": "a8680112-2f34-4c29-81c8-c19974db82e5",
  "path": "1622130252340-image.png",
  "name": "Teste3",
  "description": "um teste ai",
  "created_at": "2021-05-27T12:44:12.344-03:00",
  "updated_at": "2021-05-27T12:44:12.344-03:00"
}
```

#

### Deletar uma imagem [DELETE "/:id"]
Deleta uma imagem, tanto da pasta quanto do banco de dados.

+ id (param) - ID do usuário que deseja deletar

+ Request (application/json)

  + Params

```
id: a8680112-2f34-4c29-81c8-c19974db82e5
```

+ Response 200 (application/json)

  + No Body


## 📄 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---
