const mongoose = require("mongoose");

const esquema = new mongoose.Schema(
  {
    posicao: {
      type: Number,
      required: "é obrigatório!",
    },

    titulo: {
      type: String,
      required: "Este dado é obrigatório",
      trim: true,
    },

    autor: {
      type: String,
      required: "Este dado é obrigatório",
      trim: true,
    },

    numero_de_paginas: {
      type: Number,
      required: "Este dado é obrigatório",
      trim: true,
    },

    codigo_isbn: {
      type: String,
      required: "Este dado é obrigatório",
      trim: true,
    },

    editora: {
      type: String,
      required: "Este dado é obrigatório",
      trim: true,
    },

    edicao: {
      type: String,
      required: "Este dado é obrigatório",
      trim: true,
    },

    usuario_Criador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: "é obrigatório!",
    },
  },
  {
    timestamps: true,
  }
);

const EsquemaLivro = mongoose.models.Livro || mongoose.model("Livro", esquema);
module.exports = EsquemaLivro;
