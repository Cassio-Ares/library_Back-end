/**
 * importações 
 */
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');  /**para não termos problema de conflito no front */
const swaggerUi = require('swagger-ui-express');
const swaggerOption = {customCssUrl: '/swagger-ui.css'}; /**protege para não ter conflito com a vercel em produção*/
const routes = require('./src/routes');
const authDocProducao = require('./src/middlewares/autoDoc');

const app = express();
require('dotenv').config();  /**arquivo de variavel de ambiente */


/**
 * configuração do express
 */
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * documentação Swagger
 */
if(process.env.NODE_ENV !== 'test'){
    const swaggerFile = require('./swagger/swagger_output.json');
    app.get('/', (req, res)=>{ /*#swagger.ignore = true*/ res.redirect('/doc'); });
    app.use('/doc', authDocProducao, swaggerUi.serve, swaggerUi.setup(swaggerFile, swaggerOption));
}


/**
 * end-points rotas da API 
 */
routes(app)


/**
 * inicialização do servidor
 * no express não no bin/www
 */
if(process.env.NODE_ENV !== 'test'){
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
}

module.exports = app;
