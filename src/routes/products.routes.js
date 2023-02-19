const { Router } = require("express");

const ensureAdminAuthenticated = require("../middlewares/ensureAdminAuthenticated");

const productsRoutes = Router();

productsRoutes.get("/", ensureAdminAuthenticated, (request, response) => {
  response.json("Hello World");
});

module.exports = productsRoutes;
