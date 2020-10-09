'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/items', 'ItemController.index')

Route.post('/points', 'PointController.create')
Route.get('/points', 'PointController.index')
Route.get('/points/:id', 'PointController.show')
Route.put('/points/:id', 'PointController.update')
Route.delete('/points/:id', 'PointController.destroy')
