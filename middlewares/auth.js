'use strict'
const services = require('../services')
const { response } = require('express')

function isAuth(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message : 'Missing Authentication header.'})
    }

    const token = req.headers.authorization.split(' ')[1]
    services.decodeToken(token)
    .then(response => {
        req.user = response
        next()
    })
    .catch( response => {
        return res.status(response.status).send({message : 'Invalid Authentication.'})
    })
}

module.exports = isAuth