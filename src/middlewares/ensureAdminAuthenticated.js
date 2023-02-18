const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const authConfig = require("../configs/auth");

function ensureAdminAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token não informado", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id, role } = verify(token, authConfig.jwt.secret);

    if (role !== "admin") {
      throw new AppError("Você não tem permissão para acessar esta rota", 401);
    }

    request.user = {
      id: Number(user_id),
      role: role,
    };

    return next();
  } catch {
    throw new AppError("JWT Token inválido", 401);
  }
}

module.exports = ensureAdminAuthenticated;
