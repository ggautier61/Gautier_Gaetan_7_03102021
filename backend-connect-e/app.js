const express = require('express');
const userRoutes = require('./routes/user');
const path = require('path');
const helmet = require('helmet');
const nocache = require('nocache');
const bobyParser = require('body-parser');


//Création de l'application
const app = express();
//Importation de dotnet pour gerer les fichiers système
require('dotenv').config();

app.use(helmet()); // Utilisation de Helmet pour sécuriser l'app Express

//paramétrage des headers pour CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bobyParser.json());

//Désactive la mise en cache du navigateur
app.use(nocache());


//Détermination d'un chemin statique pour accéder au dossier local "images"
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

//configuration des routes de bases
// app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
