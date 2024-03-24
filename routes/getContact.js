const express = require("express");
const { get_Contact } = require("../routeControllers/RouteController");
const validateToken = require("../middleWare/validateTokenHandler");
const route = express.Router();

// validataiong the user and then get the access
route.route("/:id").get(validateToken ,get_Contact)

module.exports = route