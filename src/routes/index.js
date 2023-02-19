const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoute = require("./sessions.routes");
const productsRoutes = require("./products.routes");
const categoriesRoutes = require("./categories.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoute);
routes.use("/products", productsRoutes);
routes.use("/categories", categoriesRoutes);

module.exports = routes;
