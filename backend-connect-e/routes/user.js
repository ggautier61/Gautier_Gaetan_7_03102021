const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const checkPassword = require('../middleware/checkValidityPassword');

//Importation de rateLimit pour limiter le nombre d'appels de l'Api 
const rateLimit = require('express-rate-limit');

//Configuration de la limite d'appels pour la connexion à un compte
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15,                   // limite pour chaque IP à 5 requêtes
    message:
      "Vous avez effectué trop de tentatives de connexion, Veuillez réessayer dans 15 minutes"
  });

//Configuration des routes user. utilisation d'un middleware pour vérifier
//si le mot de passe correspond au schéma de sécurité demandé.
router.post('/signup', userCtrl.signup);
router.post('/login', loginLimiter, userCtrl.login);

// router.use((err, req, res, next) => {
//   next();
// })

module.exports = router;
