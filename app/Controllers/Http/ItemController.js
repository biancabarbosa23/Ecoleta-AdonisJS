'use strict'

const Database = use('Database')

class ItemController {

    async index({ request, response }) {
        const items = await Database.table('items').select('*')

        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                imagem_url: `http://localhost:3030/uploads/${item.image}`
            }
        })

        return response.json(serializedItems)
    }
}

module.exports = ItemController
