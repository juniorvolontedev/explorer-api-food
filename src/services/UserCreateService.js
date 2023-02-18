const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ name, email, password }) {
    if (!name || !email || !password) {
      throw new AppError("Os campos nome, e-mail e senha são obrigatórios.");
    }

    const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!validEmailRegex.test(email)) {
      throw new AppError("Digite um e-mail válido.");
    }

    const userExist = await this.userRepository.getUserByEmail(email);

    if (userExist) {
      throw new AppError("Este e-mail já está em uso.");
    }

    if (password.length < 6) {
      throw new AppError("A senha precisa ter no mínimo 6 caracteres.");
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }
}

module.exports = UserCreateService;
