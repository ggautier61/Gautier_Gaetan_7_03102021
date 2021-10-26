const express = require('express');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
// const userRoute = require('./routes/user');
const path = require('path');
const helmet = require('helmet');
const nocache = require('nocache');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require("./models");
const Role = db.role;

//Importation de dotnet pour gerer les fichiers système
require('dotenv').config();

app.use(helmet()); // Utilisation de Helmet pour sécuriser l'app Express

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors());

// For development
// db.sequelize.sync({force: true}).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });

//For Production
db.sequelize.sync();

function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
      
    Role.create({
      id: 2,
      name: "admin"
    });
}

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});



//Désactive la mise en cache du navigateur
app.use(nocache());


//Détermination d'un chemin statique pour accéder au dossier local "images"
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

//configuration des routes de bases
require('./routes/auth.routes') (app);
require('./routes/user.routes') (app);
// app.use('/api/auth', authRoutes);
// app.use('/api/test', userRoutes);



module.exports = app;
