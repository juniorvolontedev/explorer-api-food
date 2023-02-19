const AppError = require("../utils/AppError");

class ProductCreateService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute({ name, category_id, ingredients, price, description }) {
    if (!name || !category_id || !price) {
      throw new AppError("Os campos nome, categoria e preço são obrigatórios.");
    }

    const productCreated = await this.productRepository.create({
      name,
      category_id,
      ingredients,
      price,
      description,
    });

    return productCreated;
  }
}

module.exports = ProductCreateService;
