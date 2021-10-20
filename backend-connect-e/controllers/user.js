//Importation de bcrypt pour le hash du mot de passe
const bcrypt = require('bcrypt');
//Importation de jsonwebtoken pour créer un jeton à la connexion du user
const jwt = require('jsonwebtoken');
const db = require('../connection');


// Inscription de l'utilisateur, utilisation de Bcrypt pour le hash du mot de passe
// Permet de ne pas mettre en BDD le mot de passe en clair
exports.signup = (req, res) => {
  
    bcrypt.hash(req.body.password, 10)
    .then(hash => {

      const sql = "INSERT INTO `user` (`lastname`, `firstname`, `email`, `password`, `create_time`, `last_connection`) VALUES ('"
            + req.body.lastname + "', '"
            + req.body.firstname + "', '"
            + req.body.email + "', '"
            + hash + "',null,null)";

    
      db.query(sql, (err, rows, fields) => {
        if(!err) {
              return res.status(200).json(rows.insertId);
            }
            else
            {
              switch (err.code) {
                case 'ER_DUP_ENTRY':
                return res.status(401).json({ message: 'Cette adresse email existe déjà.' })  
                default:
                  throw err;
              }
            }  
        });    
    })
    .catch(error => res.status(500).json({ error }));
} 

//Connexion de l'utilisateur, utilisation du jsonwebtoken, bcrypt pour décrypter le mot de passe
exports.login = (req, res, next) => {

  const email = req.body.email;
  const sql = "SELECT `id`, `lastname`, `firstname`, `email`, `password` FROM `user` WHERE `email` = '" + email + "'";

  db.query(sql, (err, rows, fields) => {
    if(err) throw err;
    if (!rows[0]) {
      console.log('user n\'existe pas');
      res.status(401).json({ message: 'l\'adresse email n\'existe pas' });
    } else {
      this.user = rows[0];
      const hash = rows[0].password;

      //Comparaison entre le mot de passe renseigné dans le formulaire et le mot de passe en BDD.
        bcrypt.compare(req.body.password, hash)
          .then(valid => {
            if (!valid) {
              return res.status(401).send({ message: 'Nom utilisateur et/ou mot de passe incorrect !' });
            }
          
            //Création du token aléatoire pour une durée de 1h
            res.status(200).json({
              userId: this.user.id,
              token: jwt.sign({ userId: this.user.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '1h' })
            });
          })
          .catch(error => res.status(500).json({ error }))
      }
  })
}

exports.getuser = (req, res, next) => {

}
