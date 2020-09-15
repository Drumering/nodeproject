//Environment vars settings file
require('dotenv').config({path:'variables.env'});

// Database connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error)=>{
    console.error("ERROR: " + error.message);
})

// Loading all models
require('./models/Post');

// Starting app
const app = require('./app');

//Server settings
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), ()=>{
    console.log("Servidor rodando na porta: " + server.address().port);
});