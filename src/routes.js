function routes(app){
   app.use('/user', require('./routes/users.js'));
}

module.exports = routes;