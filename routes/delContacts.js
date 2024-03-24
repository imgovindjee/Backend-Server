const express = require("express");
const { del_Contacts } = require("../routeControllers/RouteController");
const validateToken = require("../middleWare/validateTokenHandler");
const route = express.Router();

route.use(validateToken); // validataiong the user
route.route("/:id").delete(del_Contacts) //then deleteing the contact 

module.exports = route;