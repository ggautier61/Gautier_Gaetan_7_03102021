//importation de password-validator qui permet de définir comment doit 
//être composé de mot de passe suivant un model
var passwordValidator = require('password-validator');
 
//Création du schéma du mot de passe
var passwordSchema = new passwordValidator();
 
// Détermination des propriétés du schéma
passwordSchema
.is().min(8)                                    // Minimum length 8
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().letters()                               // Must have at least 1 letters
.has().digits()                                // Must have at least 1 digits
.has().symbols()                                // Must have at least 1 symbol
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf([
    'P@ssw0rd1', 
    'P@ssword123']); // Blacklist these values
 

module.exports = passwordSchema; 
