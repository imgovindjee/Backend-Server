const express = require("express");
const { post_Contacts } = require("../routeControllers/RouteController");
const validateToken = require("../middleWare/validateTokenHandler");
const route = express.Router();

// validataiong the user and then giving POST-access
route.use(validateToken) 
route.route("/").post(post_Contacts)

module.exports = route;