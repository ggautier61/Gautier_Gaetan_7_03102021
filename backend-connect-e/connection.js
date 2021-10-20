//importation de mysql
const mysql = require('mysql2');
require('dotenv').config();

//connexion à la base de données MySql
const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.LOGIN_DB,
    password: process.env.PWD_DB,
    database : process.env.DATABASE
  });
 
 connection.connect(function(err) {
   if (err) {
   throw err
   } else {
   console.log("Connecté à la base de données MySQL!");
   };
  });


  module.exports = connection;