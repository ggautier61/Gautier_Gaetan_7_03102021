const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {

  // Save User to Database
  var body = req.body;

  User.create({
    lastname: body.lastname,
    firstname: body.firstname,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10)
  })
    .then(user => {

     
      if (req.body.roles) {
        //retrouve l'id du role émis dans la requête
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1 User
        user.setRoles([1]).then(() => {
            res.status(200).send(user);
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {

  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      console.log(user);
      if (!user) {
        return res.status(404).send({ message: "Adresse email et/ou mot passe incorrect!" });
      }

      // Vérification du mot de passe
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Adresse email et/ou mot passe incorrect!"
        });
      }

      //Création du tokken avec jsonwebtoken
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 3600 // 1 hours
      });

      //TODO : supprimer getRoles() car pas besoin pour renvoit du json au front pour l'authentification
      //tableau de roles qui sera renvoyer dans la réponse
      var authorities = [];
      //Récupération de la table roles de mysql
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          // lastname: user.lastname,
          // firstname: user.firstname,
          // email: user.email,
          // imageURL: user.imageURL,
          // roles: authorities,
          accessToken: token
        });5
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};