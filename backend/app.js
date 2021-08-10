const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require ('mysql');
const connection = mysql.createConnection ({
  host: 'localhost',
  user: 'root',
  password: 'Serigne1*',
  //database: 'nom de la base de données'
  port: 3306
});

connection.connect ((err) => {
  if (err) throw err;
  console.log ('Connecté!');
});


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());



app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
   console.log("user : "+process.env.SQL_USER);
});


module.exports = app;