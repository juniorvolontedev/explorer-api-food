const { Router } = require("express");

const ProductsController = require("../controllers/ProductsController");
const productsController = new ProductsController();

const ensureAdminAuthenticated = require("../middlewares/ensureAdminAuthenticated");

const productsRoutes = Router();

productsRoutes.post("/", ensureAdminAuthenticated, productsController.create);

module.exports = productsRoutes;
