//importation du model
const passwordModel = require('../models/password');
const User = require('../models/user');


module.exports = (req, res, next) => {
    if(!passwordModel.validate(req.body.password)) {
        
        res.status(401).json({ message: 'Le mot de passe doit contenir au moins 8 caractères avec au moins ' + 
        '1 lettre, 1 chiffre, 1 Majuscule, 1 minuscule, 1 symbole et sans espace' })
    } else {
        next();
    }

}
