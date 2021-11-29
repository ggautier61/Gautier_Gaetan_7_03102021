const authCtrl = require("../controllers/auth.controller");
const authToken = require('../middleware');
const newsCrtl = require("../controllers/news.controller");
const multer = require('../middleware/multer-config');

module.exports = function(app) {

  // app.get("/api/news", newsCrtl.getNews);

  app.post("/api/create-news", multer, newsCrtl.postNews);
  app.get("/api/getAllNews", newsCrtl.getAllNews);
  // app.post("/api/comment", newsCrtl.postComment)

};