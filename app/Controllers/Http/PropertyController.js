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

// Aqui buscamos os dados lat long do corpo da requisição (enviado pelo front-end)
// E utilizamos o nearBy que criamos como scopeNearBy 
    //index: Listar todos registros, proximos ate 10km:

    async index ({ request }) {
      const { latitude, longitude } = request.all()
    
      const properties = Property.query()
      // .with realiza Eager Loading nas imagens adicionando-as ao retorno de cada imóvel
      .with('images')
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
  async store ({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      'address',
      'latitude',
      'longitude',
      'price'
    ])
  
    const property = await Property.create({ ...data, user_id: id })
  
    return property
  }

  

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
  async update({ params, request, response }) {
    // findOrFail, pra buscar o ID que vem da URL e atualizar no banco ou.. FAIL
    const property = await Property.findOrFail(params.id)

    // buscamos novamente dados da requisicao 
    const data = request.only([

        'title',
        'address',
        'latitude',
        'longitude',
        'price'
      ])

      // e damos merge - fundimos os dados de 'property' (do banco) com o da requisição 'PUT'
      property.merge(data)
      await property.save()

      return property
  }

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
  }
    
}

module.exports = PropertyController;
