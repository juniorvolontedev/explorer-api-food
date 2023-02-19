const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoute = require("./sessions.routes");
const productsRoutes = require("./products.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoute);
routes.use("/products", productsRoutes);

module.exports = routes;
