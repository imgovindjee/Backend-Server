const express = require("express");
const route = express.Router();

const { get_Contacts } = require("../routeControllers/RouteController");
const validateToken = require("../middleWare/validateTokenHandler");

// validataiong the user and then returning the contact 
route.use(validateToken)
route.route("/").get(get_Contacts)

module.exports = route;