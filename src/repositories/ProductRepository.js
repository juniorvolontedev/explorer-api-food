const knex = require("../database/knex");

class ProductRepository {
  async create({ name, category_id, ingredients, price, description }) {
    const productCreated = await knex("products").insert({
      name,
      category_id,
      price,
      description,
    });

    const product_id = productCreated[0];

    if (ingredients) {
      const ingredientsToInsert = ingredients.map((name) => {
        return {
          name,
          product_id: product_id,
        };
      });

      await knex("ingredients").insert(ingredientsToInsert);
    }

    return product_id;
  }
}

module.exports = ProductRepository;
