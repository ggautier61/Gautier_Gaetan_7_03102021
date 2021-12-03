// const { User } = require("../models/user.model");

//Model News correspondant à la table news de mySQL
module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
      // ownerId: {
      //   type: Sequelize.STRING,
      //   references: { model: User, key: 'id'}
      // },
      // id: {
      //   type: Sequelize.INTEGER,  
      //   autoIncrement: true,
      //   primaryKey: true
      // },
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