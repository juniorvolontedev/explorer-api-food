const { compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

// TODO: Ver sobre mudar o nome dessa classe para SessionCreateService
class SessionService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new AppError("Os campos e-mail e senha são obrigatórios.");
    }

    const user = await this.userRepository.getUserByEmail(email);

    if (!user) {
      throw new AppError("Não foi possível encontrar sua conta.");
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new AppError("E-mail e/ou senha incorreta.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return { user, token };
  }
}

module.exports = SessionService;
