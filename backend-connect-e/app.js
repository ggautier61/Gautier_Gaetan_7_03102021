const express = require('express');

//importation des routes de l'app
const userRoutes = require('./routes/user');
//Importation de path pour sauvegarder les images
const path = require('path');
//importation de Helmet pour sécuriser l'app Express
const helmet = require('helmet');
//importation de mysql
const mysql = require('mysql');
//Permet de désactiver le cache
const nocache = require('nocache');

//Création de l'application
const app = express();
//Importation de dotnet pour gerer les fichiers système
require('dotenv').config();

app.use(helmet()); // Utilisation de Helmet pour sécuriser l'app Express

//connexion à la base de données MySql
const con = mysql.createConnection({
   host: process.env.HOST,
   user: process.env.LOGIN_DB,
   password: process.env.PWD_DB,
   database : process.env.DATABASE
 });

  con.connect(function(err) {
   if (err) {
    throw err
   } else {
    console.log("Connecté à la base de données MySQL!");
   }
   
  //  con.query("SELECT eleves.id as 'eleve_id', eleves.nom as 'eleve_nom', eleves.cours_id, cours.nom as 'cours_nom', cours.date as 'cours_date' FROM eleves JOIN cours on eleves.cours_id = cours.id", function (err, result) {
  //      if (err) throw err;
  //      console.log(result);
  //    });
 });

//paramétrage des headers pour CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Désactive la mise en cache du navigateur
app.use(nocache());

//Détermination d'un chemin statique pour accéder au dossier local "images"
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

//configuration des routes de bases
// app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;