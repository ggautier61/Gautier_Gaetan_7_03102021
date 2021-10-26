const db = require("../models");
const User = db.user;


exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
exports.userBoard = (req, res) => {
res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
res.status(200).send("Admin Content.");
};

exports.modifyUser = (req, res, next) => {

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
        { where: { id: body.id }});
        break;
      }
    case 'firstname': {
      console.log('firstname');
      User.update(
        { firstname: body.value },
        { where: { id: body.id }}
      )
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
}

exports.getUser = (req, res) => {

  const id = req.params.id;
  console.log(id);
  User.findByPk(req.params.id).then(user => {
    console.log('user', user);
    res.status(200).send(user);
  })
}

exports.getUsers = async function (req, res, next) {

  console.log('get users');

  User.findAll().then(users => {
    // console.log(users);
    res.status(200).send(users);
  }); 

}

exports.saveImage = (req, res) => {
  console.log('save image');
}