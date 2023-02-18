const UserRepository = require("../repositories/UserRepository");
const SessionService = require("../services/SessionService");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const userRepository = new UserRepository();
    const sessionService = new SessionService(userRepository);
    const auth = await sessionService.execute({ email, password });

    return response.json(auth);
  }
}

module.exports = SessionsController;
