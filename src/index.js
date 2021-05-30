const express = require('express');
const mysql = require('mysql2');
const config = require('./config/app');
const app = express();
const mysqlConnection = mysql.createConnection(config);
module.exports = mysqlConnection;
mysqlConnection.connect(err => {
    if (err) console.log(err);
    console.log(`Connected`);
});
const myPassport = require('./app/components/my_modules/passport');

app.use((req, res, next) => {         
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'authorization, Content-Type');
  next();
});

app.use(myPassport.initialize);       
myPassport.passportUse();
            
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello World");
});


const mainRoute = require('./app/routes/main.route');   
app.use('/', mainRoute);  

app.listen('5000',() => {
    console.log(`Server is listening on port 5000`);
});
