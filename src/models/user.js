const mongoose = require("mongoose");
const validator = require("validator");

const esquema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "Este dado é obrigatório",
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: "Este dado é obrigatório",
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      validate: {
        validator: (valorDigitado) => {
          return validator.isEmail(valorDigitado);
        },
        message: "inválido!",
      },
    },

    senha: {
      type: String,
      required: "Este dado é obrigatório",
      trim: true,
      minlength: 6,
      select: false,
    },
  },

  {
    timestamps: true,
  }

);


const EsquemaUser = mongoose.models.Usuario || mongoose.model("Usuario", esquema);
module.exports = EsquemaUser;

//apos montar o model lembrar de levalo para autogenDoc