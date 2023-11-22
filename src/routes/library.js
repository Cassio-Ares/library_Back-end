const express = require("express");
const tratarErros = require("../functions/tratarErros");
const autoUser = require("../middlewares/autoUser");
const conectarBD = require("../middlewares/conectarBD");
const EsquemaLivro = require("../models/library");
const router = express.Router();

router.post("/cadastrar", autoUser, conectarBD, async function (req, res) {
  try {
    //#swagger.tags = ["Cadastrar livros"]

    let {
      posicao,
      titulo,
      autor,
      numero_de_paginas,
      codigo_isbn,
      editora,
      edicao,
    } = req.body;

    const usuario_Criador = req.usuarioJWT.id;

    const respostaBD = await EsquemaLivro.create({
      posicao,
      titulo,
      autor,
      numero_de_paginas,
      codigo_isbn,
      editora,
      edicao,
      usuario_Criador,
    });

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livro cadastrado com sucesso.",
      resposta: respostaBD,
    });
  } catch (error) {
    return tratarErros(res, error);
  }
});

router.get(
  "/livrosCadastrados",
  autoUser,
  conectarBD,
  async function (req, res) {
    try {
      //#swagger.tags = ["Livros cadastrados"]
      // const usuarioLogado = req.usuarioJwt.id;
      const respostaBD = await EsquemaLivro.find();

      res.status(200).json({
        status: "OK",
        statusMensagem: "Livros encontrados com sucesso.",
        resposta: respostaBD,
      });
    } catch (error) {
      return tratarErros(res, req);
    }
  }
);

router.get("/buscarLivro/:id", autoUser, conectarBD, async function (req, res) {
  try {
    //#swagger.tags = ["Buscar Livros cadastrados"]
    //#swagger.tags = "Endpoint para buscar livros"

    const idLivros = req.params.id;
    
  
    const respostaBD = await EsquemaLivro.findById({
      _id: idLivros,
    });

    if (!respostaBD) {
        return res.status(404).json({
             status: 'Not Found',
            statusMensagem: 'Livro não encontrado.',
         });
     }

    res.status(200).json({
      status: "OK",
      statusMensagem: "Livro recuperado com sucesso.",
      resposta: respostaBD,
    });
  } catch (error) {
    return tratarErros(res, req);
  }
});

router.put("/atualizar/:id", autoUser, conectarBD, async function (req, res) {
  try {
    //#swagger.tags = ["Atualizar livros"]
    let idLivros = req.params.id;
    const usuario_Criador = req.usuarioJWT.id;
    let {
      posicao,
      titulo,
      autor,
      numero_de_paginas,
      codigo_isbn,
      editora,
      edicao,
    } = req.body;
  
    const checkLivros = await EsquemaLivro.findOne({
      _id: idLivros
    });

    if (!checkLivros) {
      throw new Error("Livro não encontrado");
    }

    const livroAtualizado = await EsquemaLivro.updateOne(
      { _id: idLivros },
      {
        posicao,
        titulo,
        autor,
        numero_de_paginas,
        codigo_isbn,
        editora,
        edicao,
        usuario_Criador,
      }
    );

    if(livroAtualizado?.modifiedCount > 0) {
        const dadosAtualizados = await EsquemaLivro.findOne({ _id: idLivros }).populate('usuario_Criador');

      res.status(200).json({
        status: "OK",
        statusMensagem: "Livro atualizado com sucesso.",
        resposta: dadosAtualizados,
      });
    }
  } catch (error) {
    return tratarErros(res, req);
  }
});

router.delete(
  "/deletarLivro/:id",
  autoUser,
  conectarBD,
  async function (req, res) {
    try {
      //#swagger.tags = ["Deletar livro"];
      //#swagger.tags = "Endpoint para deletar livros"
      const idLivros = req.params.id;
      const usuario_Criador = req.usuarioJWT.id;

      const checkLivro = await EsquemaLivro.findOne({
        _id: idLivros,
       usuario_Criador: usuario_Criador,
      });

      if (!checkLivro) {
        throw new Error("Livro não encontrado");
      }

      const respostaBD = await EsquemaLivro.deleteOne({ _id: idLivros });
      res.status(200).json({
        status: "OK",
        statusMensagem: "Tarefa deletada com sucesso.",
        resposta: respostaBD,
      });
    } catch (error) {
      return tratarErros(res, error);
    }
  }
);

module.exports = router;
