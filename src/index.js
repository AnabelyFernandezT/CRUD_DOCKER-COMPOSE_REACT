const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { mongoose } = require ('./database');
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());

//Routers
app.use('/api/task',require('./routes/task.routes'));


//Static files
app.use(express.static(path.join(__dirname,'public')));



//start server
app.listen(app.get('port'),()=>{
    console.log(`Server is running on http://localhost:${app.get('port')}`)});