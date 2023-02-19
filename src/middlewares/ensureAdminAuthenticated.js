const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");
const UserRepository = require("../repositories/UserRepository");

async function ensureAdminAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
    };

    if (user_id) {
      const userRepository = new UserRepository();
      const user = await userRepository.getUserById(user_id);

      if (!user) {
        throw new AppError("JWT Token inválido", 401);
      }

      if (user.role !== "admin") {
        throw new AppError("Você não tem permissão para acessar esse recurso.");
      }

      return next();
    }
  } catch (error) {
    throw new AppError(error.message, 401);
  }
}

module.exports = ensureAdminAuthenticated;
