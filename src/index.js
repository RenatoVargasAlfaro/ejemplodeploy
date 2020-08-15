const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();


//----------------------------------------//
//requerimos el modulo de mongoose
const mongoose = require('mongoose');
//conectamos a la bd
mongoose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('bd conectada')) //se usa una promesa para ver si se conecto
    .catch(err => console.log(err));
//----------------------------------------//


//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //permite entender los datos que se envia desde un formulario html

//routes (NO OLVIDAR SIEMPRE REQUERIR LAS RUTAS)
const route = require('./routes/index');
app.use(route);


app.listen(app.get('port'), () => {
    console.log('Servidor funcionando');
});