/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

// user routes (somente o adm pode usar os metodos index, show, update e destroy)
Route.group(() => {
  Route.post('/users', 'UsersController.store')
  Route.get('/users', 'UsersController.index').middleware(['auth', 'adm'])
  Route.get('/users/:id', 'UsersController.show').middleware(['auth', 'adm'])
  Route.put('/users/:id', 'UsersController.update').middleware(['auth'])
  Route.delete('/users/:id', 'UsersController.destroy').middleware(['auth'])
})

// login
Route.post('/auth', 'AuthController.authenticate')

// Image upload
Route.group(() => {
  Route.get('/uploads', 'ImagesController.index')
  Route.get('/uploads/:filename', 'ImagesController.show')
  Route.post('/uploads', 'ImagesController.store').middleware(['auth', 'adm'])
  Route.put('/uploads/:id', 'ImagesController.update').middleware(['auth', 'adm'])
  Route.delete('/uploads/:id', 'ImagesController.destroy').middleware(['auth', 'adm'])
})

// Adm controller, cria um adm, lista ou deleta. Somente adms ou criar outros
Route.group(() => {
  Route.resource('/adm', 'AdmsController')
}).middleware(['auth', 'adm'])

// Rotas para criar o carrossel
Route.group(() => {
  Route.resource('/carrossel', 'CarrosselsController').except(['index'])
}).middleware(['auth', 'adm'])

Route.get('/carrossel', 'CarrosselsController.index')
