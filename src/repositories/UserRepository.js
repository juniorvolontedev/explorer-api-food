const knex = require("../database/knex");

class UserRepository {
  async create({ name, email, password }) {
    const user_id = await knex("users").insert({
      name,
      email,
      password,
    });

    return { id: user_id };
  }
}

module.exports = UserRepository;
