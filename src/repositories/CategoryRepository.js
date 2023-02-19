const knex = require("../database/knex");

class CategoryRepository {
  async getCategoryByName(name) {
    const category = new knex("categories").where("name", name).first();

    return category;
  }

  async create({ name }) {
    const category_id = await knex("categories").insert({ name });

    return { id: category_id };
  }
}

module.exports = CategoryRepository;
