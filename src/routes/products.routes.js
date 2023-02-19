const { Router } = require("express");

const ProductsController = require("../controllers/ProductsController");
const productsController = new ProductsController();

const ensureAdminAuthenticated = require("../middlewares/ensureAdminAuthenticated");

const multer = require("multer");
const upload = multer();

const productsRoutes = Router();

productsRoutes.post(
  "/",
  ensureAdminAuthenticated,
  upload.single("thumbnailFile"),
  productsController.create
);

module.exports = productsRoutes;
