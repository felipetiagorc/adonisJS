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

Route.post("/users", "UserController.create");
Route.post("/sessions", "SessionController.create");

// Ao invés de criar uma rota para cada método o Adonis nos oferece um helper chamado resource
// cria todas rotas de listar, exibir, criar editar, em um unico comando..
Route.resource("properties", "PropertyController")
  // apiOnly garante as rotas Create e Edit que excluimos pq rest nao usa
  .apiOnly()
  // o middleware auth garante que user nao autenticados nao acesse as rotas
  .middleware("auth");
