//Model NewsComment correspondant à la table news de mySQL
module.exports = (sequelize, Sequelize) => {
    const NewsComment = sequelize.define("news-comments", {
      ownerId: {
        type: Sequelize.STRING
      },
      message: {
        type: Sequelize.STRING
      }
    });
  
    return NewsComment;
  };