const ProductRepository = require("../repositories/ProductRepository");
const ProductCreateService = require("../services/ProductCreateService");

class ProductsController {
  async create(request, response) {
    const { name, category_id, ingredients, price, description } = request.body;

    const productRepository = new ProductRepository();
    const productCreateService = new ProductCreateService(productRepository);
    await productCreateService.execute({
      name,
      category_id,
      ingredients,
      price,
      description,
    });

    return response.status(201).json("Produto criado com sucesso.");
  }
}

module.exports = ProductsController;
