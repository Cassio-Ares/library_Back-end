const express = require('express');
const conectarBD = require('../middlewares/conectarBD');

const router = express.Router();

/* GET users listing. */
router.get('/', conectarBD, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
