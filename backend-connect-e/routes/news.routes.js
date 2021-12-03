const authCtrl = require("../controllers/auth.controller");
const authToken = require('../middleware');
const newsCrtl = require("../controllers/news.controller");
const multer = require('../middleware/multer-config');

module.exports = function(app) {

  // app.get("/api/news", newsCrtl.getNews);

  app.post("/api/create-news", multer, newsCrtl.postNews);
  app.post("/api/comment", newsCrtl.postComment);
  app.get("/api/getAllNews", newsCrtl.getAllNews);
  app.delete("/api/news/:id", newsCrtl.deleteNews);
  app.delete("/api/comment/:id", newsCrtl.deleteComment);

};