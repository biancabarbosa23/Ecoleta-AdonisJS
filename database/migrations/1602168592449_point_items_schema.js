'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PointItemsSchema extends Schema {
  up() {
    this.create('point_items', (table) => {
      table.increments("id").primary()
      table.integer("point_id").notNullable().references("id").inTable("points");
      table.integer("item_id").notNullable().references("id").inTable("items");
      table.timestamps()
    })
  }

  down() {
    this.drop('point_items')
  }
}

module.exports = PointItemsSchema
