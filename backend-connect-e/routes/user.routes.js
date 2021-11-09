const { authToken } = require("../middleware");
const userCrtl = require("../controllers/user.controller");
const multer = require('../middleware/multer-config');

module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

    app.get("/api/users", userCrtl.getUsers);
    app.get("/api/user/:id", userCrtl.getUser);
    app.post("/api/image", multer, userCrtl.saveImage);
    app.put("/api/user", userCrtl.modifyUser);
    app.get("/api/test/all", userCrtl.allAccess);
    app.get("/api/test/user", userCrtl.userBoard);
    app.get("/api/test/admin", userCrtl.adminBoard);
    app.delete("/api/user/:id", userCrtl.deleteUser);

//   app.get(
//     "/api/test/user",
//     [authJwt.verifyToken],
//     controller.userBoard
//   );

//   app.get(
//     "/api/test/mod",
//     [authJwt.verifyToken, authJwt.isModerator],
//     controller.moderatorBoard
//   );

//   app.get(
//     "/api/test/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
//   );
};