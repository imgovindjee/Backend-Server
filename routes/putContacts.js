const express = require("express");
const { put_Contacts } = require("../routeControllers/RouteController");
const validateToken = require("../middleWare/validateTokenHandler");
const route = express.Router();

// validataiong the user and then giveing access
route.route("/:id").put(validateToken, put_Contacts)

module.exports = route;