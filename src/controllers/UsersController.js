const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute({ thumbnail, name, email, password });

    return response.status(201).json("Usuário criado com sucesso.");
  }
}

module.exports = UsersController;
