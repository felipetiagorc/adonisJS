"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});
// rota para exibir a imagem:
Route.get('images/:path', 'ImageController.show')

// quando chamar essa rota, acione o Controller.Método:
Route.post("/users", "UserController.create");
Route.post("/sessions", "SessionController.create");
Route.post('properties/:id/images', 'ImageController.store').middleware('auth')

// Ao invés de criar uma rota para cada método o Adonis nos oferece um helper chamado resource
// q cria todas rotas de listar, exibir, criar editar, em um unico comando..
Route.resource("properties", "PropertyController")
  // apiOnly garante as rotas Create e Edit que excluimos pq rest nao usa
  .apiOnly()
  // o middleware auth garante que user nao autenticados nao acesse as rotas
  .middleware("auth");
