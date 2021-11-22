const db = require("../models");
const User = db.user;
const Role = db.role;


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
exports.userBoard = (req, res) => {
res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.updateUser = (req, res, next) => {

  var body = req.body;
  console.log(body);
  // let id = boby.id;
  const name = body.name;
  // const val = body.value;
  
  switch(body.name) {
    case 'lastname': {
      console.log('lastname');
      User.update(
        { lastname : body.value },
        { where: { id: body.id }}
      );
      break;
      }
    case 'firstname': {
      console.log('firstname');
      User.update(
        { firstname: body.value },
        { where: { id: body.id }}
      );
      break;
    }
    case 'email': {
      User.update(
        { email: body.value },
        { where: { id: body.id }}
      )
      break;
    }
    case 'password': {

      //TODO : Ajouter cryptage du mot de passe
      User.update(
        { password: body.value },
        { where: { id: body.id }}
      )
      break;
    }

    case 'role': {
      
      console.log('id', body.id);
      console.log('name', body.value);

      User.findByPk(body.id).then(user => {
        console.log(user);
        //Ajout du role User
        Role.findOne({ where: {name: body.value}}).then(role => {
          console.log('role : ', role);
          user.setRoles([role.id]).then(() => {
            res.send({ message: "Mise à jour role OK"})
          })
        })
        .catch(err => {
          res.status(500).send({ message: err.message });
        })
      })
      .catch((error) => res.status(400).json({ message: error }))
      break;
    }
    default: {
      break;
    }
  }

  //     )
  //     .then(function([ rowsUpdate, [updatedBook] ]) {
  //       console.log(rowsUpdate);
  //       console.log(updatedBook);
  //       res.json(updatedBook)
  //     })
  //     .catch(next)
  //   }
  // }
 
  // User.update(
  //   {body.name: boby.value }
  // )
  // res.status(200).send('Modifications enregistrées!')
};

exports.getUser = function(req, res) {

  User.findByPk(req.params.id, { include: [{ model: Role, required: true }]}).then(user => {
    res.status(200).send(user);
  })
};

exports.getUsers = async function (req, res, next) { 

  User.findAll({ include: [{ model: Role }]}).then(users => {
      res.status(200).send(users);  
    });
};

exports.saveImage = (req, res) => {

  var body = req.body;

  if(req.file) {

    const urlFile = req.protocol + '://' + req.get('host') + '/images/' + req.file.filename;
    console.log('urlFile', urlFile);

    User.findByPk(body.id).then(user => {

      user.imageURL = urlFile.toString();

      user.save().then(data => {
        console.log(data);
        res.status(200).send(data);
      })
      .catch((error) => {
        return res.status(500).json({ error: JSON.stringify(error) })
      });

    })
    .catch((error) => res.status(400).json({ message: 'error' }))
  }
  

    
};

exports.deleteUser = function (req, res) {

  console.log('delete');
  const id = req.params.id;
  User.findByPk(id).then(user => {
    user.destroy().then(response => {
      res.status(200).send(true);
    });
  });
};
