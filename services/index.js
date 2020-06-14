'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')
const { response } = require('express')
function createToken (user){
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    }

   return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken (token){
    const result = new Promise((resolve, reject) => {
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)
            if(payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message: 'Token expired.'
                })
            }            
            resolve(payload.sub)

        }catch(err){
            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })

    return result
}

module.exports = {createToken, decodeToken}