const knex = require("../database/knex");

class UserRepository {
  async getUserById(id) {
    const user = await knex("users").where({ id }).first();

    return user;
  }

  async getUserByEmail(email) {
    const user = await knex("users").where({ email }).first();

    return user;
  }

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
