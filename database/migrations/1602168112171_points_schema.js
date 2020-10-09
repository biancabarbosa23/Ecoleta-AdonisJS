'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PointsSchema extends Schema {
  up() {
    this.create('points', (table) => {
      table.increments("id").primary()
      table.string("image").notNullable()
      table.string("name").notNullable()
      table.string("email").notNullable()
      table.string("whatsapp").notNullable()
      table.decimal("latitude").notNullable()
      table.decimal("longitude").notNullable()
      table.string("city").notNullable()
      table.string("uf").notNullable()
      table.timestamps()

    })
  }

  down() {
    this.drop('points')
  }
}

module.exports = PointsSchema
