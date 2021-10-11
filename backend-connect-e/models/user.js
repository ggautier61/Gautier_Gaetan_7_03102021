
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
