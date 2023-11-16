const mongooseToSwagger = require('mongoose-to-swagger');
const swaggerAutogen = require("swagger-autogen")({
    openapi: "3.0.0",
    languages: "pt-BR",    
});


const outputFile = './swagger_output.json'; /** arquivo que vai ser gerado pelo autogen com a doc no formato json */
const endPointsFiles = ['../index.js', '../src/routes.js']; /**local das rotas, end-pointes */


let doc = {
    info: {
        version: "1.0.0",
        title: "API de uma biblioteca",
        description: "Documentação de uma API de uma biblioteca onde vc vai poder: cadastrar e editar os cadastros de livros ja feitos, encontrar livros ja cadastrado e deletar cadastros de livros."
        //editar descrição depois 
    },

    servers: [
        {
            url: "http://localhost:4000/",
            description: "Servidor localhost"
        },
        {
            url: "https://library-back-end.vercel.app/",
            description:"Servidor de produção"
        }
    ],

    consumes: ["application/json"],
    produces: ["application/json"],
}

/**
 * chamando o swaggerAutogen chamado lá em cima e passando parametros para ele
 * e dando um .then para que ele espere
 */

swaggerAutogen(outputFile, endPointsFiles, doc).then(()=>{
    console.log("Documentação do Swagger gerada encontra-se no arquivo em " + outputFile);
    if(process.env.NODE_ENV !== 'production'){
        require("../index.js");
    }
});