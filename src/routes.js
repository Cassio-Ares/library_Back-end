function routes(app){
   app.use('/user', require('./routes/users.js'));
   app.use('/library', require('./routes/library.js'));
}

module.exports = routes;