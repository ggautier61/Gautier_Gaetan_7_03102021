//Model News correspondant à la table news de mySQL
module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
      ownerId: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      },
      imageURL: {
        type: Sequelize.STRING
      }
      
    });
  
    return News;
  };