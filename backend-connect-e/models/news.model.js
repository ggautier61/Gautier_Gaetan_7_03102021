// const { User } = require("../models/user.model");

// const { sequelize, Sequelize } = require(".");

//Model News correspondant à la table news de mySQL
module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
      message: {
        type: Sequelize.STRING,
        onDelete: 'cascade'
      },
      imageURL: {
        type: Sequelize.STRING
      }
      
    });
  
    return News;
  };
