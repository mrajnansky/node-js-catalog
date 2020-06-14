'use strict'

const express = require('express')
const api = express.Router()

//MIDDLEWARE
const auth = require('../middlewares/auth')

//CONTROLLERS
const ProductController = require('../controllers/product')
const UserController = require('../controllers/user')

const productsEndpoint = '/product'
const usersEndpoint = '/user'

api.get(`${productsEndpoint}`, ProductController.getProducts)
api.get(`${productsEndpoint}/:productId`,ProductController.getProduct)
api.post(`${productsEndpoint}`,auth, ProductController.saveProduct)
api.put(`${productsEndpoint}/:productId`,auth, ProductController.updateProduct)
api.delete(`${productsEndpoint}/:productId`,auth, ProductController.deleteProduct)

api.post(`${usersEndpoint}/signup`,UserController.signUp)
api.post(`${usersEndpoint}/signin`,UserController.signIn)
api.get(`/private`, auth, (req, res) => {
    res.status(200).send({message: 'Auth OK'})
})
module.exports = api