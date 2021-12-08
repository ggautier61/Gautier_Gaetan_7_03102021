const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

//Paramètrage base de données mySQL
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.news = require("../models/news.model")(sequelize, Sequelize);
db.likes = require("./likes.model")(sequelize, Sequelize);
db.newscomment = require("../models/newsComment.model")(sequelize, Sequelize);


//Creation des jointures tables Users et Roles
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});


//Creation des jointures tables News et Comments
db.news.hasMany(db.newscomment, {
  onDelete: "CASCADE"
});

db.news.belongsTo(db.user);
db.newscomment.belongsTo(db.user);

db.news.hasMany(db.likes, {
  onDelete: "CASCADE"
});

db.likes.belongsTo(db.user);


db.ROLES = ["user", "admin"];

module.exports = db;