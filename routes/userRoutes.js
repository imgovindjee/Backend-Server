const express = require("express");
const { register_User, login_user, current_user } = require("../routeControllers/userControllers");
const validateToken = require("../middleWare/validateTokenHandler");

const router = express.Router();

router.post("/register", register_User)
router.post("/login", login_user)
router.get("/current", validateToken, current_user)

module.exports = router