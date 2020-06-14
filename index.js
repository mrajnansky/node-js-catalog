const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(`mongodb://${config.mongoHost}:${config.mongoPort}/${config.mongoDataBaseName}`, (err, res) => {
    if(err){ console.log( err); return;}
    console.log('DB Connection OK')
    app.listen(config.port, () => { 
        console.log(`API REST running on port ${config.port}`)
    })
})