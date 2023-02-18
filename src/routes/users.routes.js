const { Router } = require("express");

const UsersController = require("../controllers/UsersController");

const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.get("/", usersController.create);

module.exports = usersRoutes;
