const authCtrl = require("../controllers/auth.controller");
const authToken = require('../middleware');
const { newsCrtl } = require("../controllers/news.controller");

module.exports = function(app) {

  app.get("/api/news", newsCrtl.getNews);
  app.post("/api/create-news", newsCrtl.postNews);
  app.post("/api/comment", newsCrtl.postComment)

};