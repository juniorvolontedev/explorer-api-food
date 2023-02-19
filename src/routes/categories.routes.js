const { Router } = require("express");

const CategoriesController = require("../controllers/CategoriesController");
const categoriesController = new CategoriesController();

const ensureAdminAuthenticated = require("../middlewares/ensureAdminAuthenticated");

const categoriesRoutes = Router();

categoriesRoutes.post(
  "/",
  ensureAdminAuthenticated,
  categoriesController.create
);

module.exports = categoriesRoutes;
