const { Router } = require("express");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const productsRoutes = Router();

productsRoutes.get("/", ensureAuthenticated, (request, response) => {
  response.json("Hello World");
});

module.exports = productsRoutes;
