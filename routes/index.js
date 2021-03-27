var express = require("express");
var router = express.Router();
var indexController = require("../controllers/indexController");

/* GET home page. */
router.get("/", indexController.home);

router.get("/create", indexController.create);
router.post("/create", indexController.store);

router.get("/edit/:id/", indexController.edit);
router.put("/:id", indexController.update);

router.delete("/:id", indexController.destroy);

module.exports = router;
