//importation de Mongoose
const mongoose = require('mongoose');
//Importation de mongoose-unique-validator pour avoir une adresse unique en base
const uniqueValidator = require('mongoose-unique-validator');
//Importation de mongoose-type-email pour la validité de l'adresse
require('mongoose-type-email');


const userModel = mongoose.Schema({
    email: { 
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez renseigner une adresse valide.'],
    },
    password: { type: String, required: true}
});

//pour que l'utilisateur soit unique
userModel.plugin(uniqueValidator);

module.exports = mongoose.model('user', userModel);
