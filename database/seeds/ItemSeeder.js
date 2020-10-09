'use strict'

/*
|--------------------------------------------------------------------------
| ItemSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class ItemSeeder {
  async run() {
    await Database
      .table("items")
      .insert([
        { title: "Lâmpadas", image: "lampadas.svg" },
        { title: "Pilhas e baterias", image: "baterias.svg" },
        { title: "Papéis e Papelão", image: "papeis-papelao.svg" },
        { title: "Resíduos Eletrônicos", image: "eletronicos.svg" },
        { title: "Resíduos Orgânicos", image: "organicos.svg" },
        { title: "Óleo de Cozinha", image: "oleo.svg" },
      ])
  }
}

module.exports = ItemSeeder
