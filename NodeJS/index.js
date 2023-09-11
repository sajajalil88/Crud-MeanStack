require('dotenv').config();
const PORT = process.env.PORT || 3000;
const express = require('express');
var bodyParser = require('body-parser');
const connectDB = require('./db.js')
const cors = require('cors');

const mongoose = require('mongoose');
var employeeController = require('./controllers/employeeController.js');


connectDB();
var app = express();
app.use(bodyParser.json());
app.use(cors({origin : 'http://localhost:4200'}));


// app.listen(3000, () => console.log('Server started at port : 3000'));

app.use('/employees', employeeController);

mongoose.connection.once('open',()=>{
    console.log('connected to mango db') ;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
 });
 


