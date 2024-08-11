//require router for creating routers
const router = require("express").Router();

//import userController for passing controllers
const userController = require("../controllers/userController");

//here , we are passing logic for CURD operation and  here we are passing url and controller function
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/logout", userController.logout);
router.post("/addcart", userController.addcart);
router.post("/showcart", userController.showcart);
router.post("/removecart", userController.removecart);

//refreshtoken
// router.post("/refreshtoken", userController.refreshtoken);

//export router
module.exports = router;
