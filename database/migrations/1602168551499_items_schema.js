'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ItemsSchema extends Schema {
  up() {
    this.create('items', (table) => {
      table.increments("id").primary()
      table.string("image").notNullable();
      table.string("title").notNullable();
      table.timestamps()
    })
  }

  down() {
    this.drop('items')
  }
}

module.exports = ItemsSchema
