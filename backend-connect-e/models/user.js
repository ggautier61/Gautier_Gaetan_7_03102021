
const userModel = {
    email: { type: String, required: true },
    password: { type: String, required: true }
}

module.exports = userModel;


// const userModel = mongoose.Schema({
//     email: { 
//         type: String,
//         required: true,
//         unique: true,
//         match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez renseigner une adresse valide.'],
//     },
//     password: { type: String, required: true}
// });

//pour que l'utilisateur soit unique
// userModel.plugin(uniqueValidator);

// module.exports = mongoose.model('user', userModel);

// const users = [
//     {
//       "_id": "5be1ed3f1c9d44000030b061",
//       "lastname": "Gautier",
//       "firstname": "Gaetan",
//       "email": "t@t.fr",
//       "Password": "t",
//       "imageUrl": "vcam_1.jpg"
//     }
    
//   ];
  
  exports.find = () => {
    return new Promise((resolve, reject) => resolve(JSON.parse(JSON.stringify(cameras))));
  }
  
  exports.findById = (id) => {
    return new Promise((resolve, reject) =>
      resolve(JSON.parse(JSON.stringify(users)).find(user =>
        user._id == id)
      )
    );
  }

  exports.findByEmail = (email) => {
    return new Promise((resolve, reject) =>
      resolve(JSON.parse(JSON.stringify(users)).find(user =>
        user.email == email)
      )
    );
  }

