"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

// importando o Database do Adonis:
const Database = use("Database");

class Property extends Model {
  //usando Query Scopes do Adonis:

  static scopeNearBy(query, latitude, longitude, distance) {
    // usando Calculo naval de distancia:

    const haversine = `(6371 * acos(cos(radians(${latitude}))
      * cos(radians(latitude))
      * cos(radians(longitude)
      - radians(${longitude}))
      + sin(radians(${latitude}))
      * sin(radians(latitude))))`;

    return query
      .select("*", Database.raw(`${haversine} as distance`))
      .whereRaw(`${haversine} < ${distance}`);
  }

  // um proprieadade pertence a um user
  user() {
    return this.belongsTo("App/Models/User");
  }
  // um propriedade possui varias imagens
  images() {
    return this.hasMany("App/Models/Image");
  }
}

module.exports = Property;
