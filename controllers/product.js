'use strict'
//MODELS
const Product = require('../models/product')
function getProduct(req, res){
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if(err) res.status(500).send({message: `Error ${err}`})
        if(!product) res.status(404).send({message: `Product not found.`})

        res.status(200).send({product})
    })
}

function getProducts (req, res){
    Product.find({}, (err, products) => {
        if(err) res.status(500).send({message: `Error ${err}`})
        res.status(200).send({products})
    })
}

function saveProduct(req, res){
    let product = new Product()
    product.name = req.body.name
    product.image = req.body.image
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, storedProduct) => {
        if (err) res.status(500).send({message : `Error saving in DB: ${err}`})
        res.status(200).send({product: storedProduct})
    })
}

function updateProduct(req, res){
    let productId = req.params.productId
    let updatedData = req.body
    Product.findByIdAndUpdate(productId,updatedData, (err) => {
        if(err) res.status(500).send({message: `Error updating ${err}`})
        res.status(200).send({product: updatedData})
    })
}

function deleteProduct(req, res){
    let productId = req.params.productId
    Product.findById(productId, (err, product) => {
        if(err) res.status(500).send({message: `Error ${err}`})
        if(!product) res.status(404).send({message: `Product not found.`})
        product.remove(err => {
            if(err) res.status(500).send({message: `Error ${err}`})
            res.status(200).send({message : 'Product successfully removed'})
        })
    })
}

module.exports = {
    getProduct,
    getProducts,
    saveProduct,
    updateProduct,
    deleteProduct
}