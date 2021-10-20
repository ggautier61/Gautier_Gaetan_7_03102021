//Model Users correspondant à la table users de myQSQL
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      lastname: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };