const mongoose = require('mongoose');
const tratarErros = require('../functions/tratarErros');


async function conectarBD(req = null, res = null, next= null){
    try{
        await mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Conectado ao banco de dados');
        try{next();} catch{ };
        return mongoose;
    }
    catch(error){
        console.error(error);
        tratarErros(res, "Error: Erro ao conectar no Banco de dados"); 
        return error
    }
}

module.exports = conectarBD;