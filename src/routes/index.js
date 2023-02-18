const { Router } = require("express");

const usersRoutes = require("./users.routes");
const sessionsRoute = require("./sessions.routes");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoute);

module.exports = routes;
