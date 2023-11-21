// autenticação do user  
const jwt = require("jsonwebtoken");
const tratarErros = require("../functions/tratarErros");


async function autoUser(req, res, next) {
    const token = req.headers['x-auth-token'];

    if(!token) {
        return tratarErros(res, new Error("Token de autenticação não fornecido"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.usuarioJWT = decoded;

        next();

    } catch (error) {
        console.error(error);
        return tratarErros(res, new Error("Token de autenticação inválido"));
    }
}


module.exports = autoUser;