const authCtrl = require("../controllers/auth.controller");
const authToken = require('../middleware');

module.exports = function(app) {

//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

  app.post("/api/auth/signup", authCtrl.signup);

  app.post("/api/auth/signin", authCtrl.signin);
};