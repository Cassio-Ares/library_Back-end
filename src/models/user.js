const mongoose = require("mongoose");
const validator = require("validator");

const esquema = new mongoose.Schema(
  {
    nome: {
        type: String,
        required: 'é obrigatório!',
    },
    email: {
        type: String,
        unique: true,
        required: 'é obrigatório!',
        lowercase: true,
        index: true,
        validate: {
            validator: (valorDigitado) => { return validator.isEmail(valorDigitado) },
            message: 'inválido!'
        }
    },
    senha: {
        type: String,
        required: 'é obrigatório!',
        select: false,
    },
},
{
    timestamps: true
}
);


const EsquemaUser = mongoose.models.Usuario || mongoose.model("Usuario", esquema);
module.exports = EsquemaUser;

//apos montar o model lembrar de levalo para autogenDoc