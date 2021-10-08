const User = require('../models/user');
//Importation de bcrypt pour le hash du mot de passe
const bcrypt = require('bcrypt');
//Importation de jsonwebtoken pour créer un jeton à la connexion du user
const jwt = require('jsonwebtoken');

// Inscription de l'utilisateur, utilisation de Bcrypt pour le hash du mot de passe
// Permet de ne pas mettre en BDD le mot de passe en clair
exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(401).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
} 

//Connexion de l'utilisateur, utilisation du jsonwebtoken, bcrypt pour décrypter le mot de passe
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })

      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: 'l\'utilisateur n\'existe pas' })
        }
        //Comparaison entre le mot de passe renseigné dans le formulaire
        //et le mot de passe en BDD.
        if(user) {
          bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ message: 'Nom utilisateur et/ou mot de passe incorrect !' });
            }
            //Création du token aléatoire pour une durée de 1h
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '1h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
        }
        
      })
      .catch(error => res.status(500).json({ error }));
      
  }
