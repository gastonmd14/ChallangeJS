var express = require("express");
var router = express.Router();

var userController = require("../controllers/usersController");

/* GET users listing. */
router.get("/login", userController.login);
router.post("/login", userController.checkLogin);

router.get("/register", userController.register);
router.post("/register", userController.storeRegister);

router.get("/logout", userController.logout);

module.exports = router;
