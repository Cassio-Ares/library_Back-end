const express = require('express');
const conectarBD = require('../middlewares/conectarBD');
const EsquemaUser = require('../models/user');
const tratarErros = require('../functions/tratarErros');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// criando usuario
router.post('/criar', conectarBD, async function(req, res) {
    try {
      //#swagger.tags = ['Usuario']
      let{nome, email, senha} = req.body;
      const numeroVezesHash = 10;
      const senhaHash = await bcrypt.hash(senha, numeroVezesHash);
      const respostaBD = await EsquemaUser.create({nome, email, senha: senhaHash});

      res.status(200).json({
        status: "OK",
        statusMensagem: "Usuário criado com sucesso.",
        resposta: respostaBD
      })
    } catch (error) {
      if(String(error).includes("email_1 dup key")){
        return tratarErros(res, "Error: Já existe uma conta com esse e-mail!");
      }
      return tratarErros(res, error);
    }
});


router.post('/logar', conectarBD, async function (req, res) {
  try {
    // #swagger.tags = ['Usuario']
    let { email, senha } = req.body;

    let respostaBD = await EsquemaUser.findOne({ email }).select('+senha');
    if (respostaBD) {

      let senhaCorreta = await bcrypt.compare(senha, respostaBD.senha);
      if (senhaCorreta) {
        
        let token = jwt.sign({ id: respostaBD._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.header('x-auth-token', token);
        res.status(200).json({
          status: "OK",
          statusMensagem: "Usuário autenticado com sucesso.",
          resposta: { "x-auth-token": token }
        });
      } else {
        throw new Error("Email ou senha incorreta");
      }
    } else {
      throw new Error("Email ou senha incorreta");
    }
  } catch (err) {
    return tratarErros(res, err);
  }
});



module.exports = router;
