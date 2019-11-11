"use strict";

// importando o model:
const Property = use("App/Models/Property");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with properties
 */
class PropertyController {
  /**
   * Show a list of all properties.
   * GET properties
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  //index: Listar todos registros;
/*
  async index() {
    const properties = Property.all();

    return properties;
  }

  */


    //index: Listar todos registros, proximos ate 10km:

    async index ({ request }) {
      const { latitude, longitude } = request.all()
    
      const properties = Property.query()
        .nearBy(latitude, longitude, 10)
        .fetch()
    
      return properties
    }

  /**
   * Render a form to be used for creating a new property.
   * GET properties/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  //store: Criar novo registro;
  async store({ request, response }) {}

  /**
   * Display a single property.
   * GET properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  //show: Exibir um registro;
  async show({ params }) {
    const property = await Property.findOrFail(params.id);

    await property.load("images");

    return property;
  }

  /**
   * Render a form to update an existing property.
   * GET properties/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  // update: Alterar um registro;
  async update({ params, request, response }) {}

  /**
   * Delete a property with id.
   * DELETE properties/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  //destroy: Remover um registro;
  async destroy ({ params, auth, response }) {
    const property = await Property.findOrFail(params.id)
  
    if (property.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }
  
    await property.delete()
  

module.exports = PropertyController;
