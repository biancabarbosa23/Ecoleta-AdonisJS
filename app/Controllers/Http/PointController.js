'use strict'


const Database = use('Database')

class PointController {

    async index({ request, response }) {
        //solicitar da query
        const { city, uf, items } = request.get()

        const parsedItemsToArray = items.split(',').map(item => item.trim())

        const points = await Database.table('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItemsToArray)
            .where('city', city)
            .where('uf', uf)
            .distinct()
            .select('points.*')

        response.json(points)


    }

    async show({ request, response }) {
        const { id } = request.params

        const point = await Database.table('points').where('id', id).first()

        if (!point) {
            return response.status(400)
                .json({ message: 'Point not found!' })
        }

        const items = await Database.table('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title')

        return response.json({ point, items })
    }

    async create({ request, response }) {
        //solicitar do body
        const { name, email, whatsapp, latitude, longitude, city, uf, items } = request.post()

        //transition no adonis
        const trx = await Database.beginTransaction()

        const dataToCreatePoint = {
            image:
                "https://images.unsplash.com/photo-1583853269687-0daaa26b22de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        //creando ponto
        const point_id = await trx.insert(dataToCreatePoint).into('points').returning('id');


        const dataToCreatePointItems = (items).map((item_id) => {
            return {
                item_id,
                point_id,
            };
        });

        await trx.insert(dataToCreatePointItems).into("point_items")

        await trx.commit()

        response.json({ id: point_id, ...dataToCreatePoint })

    }

    async update({ request, response }) {
        const { id } = request.params

        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = request.post();

        const trx = await Database.beginTransaction()

        const point = {
            image:
                "https://images.unsplash.com/photo-1583853269687-0daaa26b22de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const pointUpdate = await trx.table("points").where("id", id).update(point);

        await trx.table("point_items").where("point_id", id).del();

        const pointItemsInsert = items.map((item_id) => {
            return {
                item_id,
                point_id: Number(id),
            };
        });

        await trx.table("point_items").insert(pointItemsInsert);

        await trx.commit();

        response.json({ point, pointItemsInsert });
    }

    async destroy({ request, response }) {
        const { id } = request.params;

        const trx = await Database.beginTransaction();

        await trx.table("points").where("id", id).del();
        await trx.table("point_items").where("point_id", id).del();
        await trx.commit();

        response.json({ sucess: true });
    }
}

module.exports = PointController
