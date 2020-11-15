const Routes = require('express').Router()

const controller = require('../controllers/serverController')

Routes.get('/messages', controller.take)

Routes.post('/messages', controller.add)

module.exports = Routes
