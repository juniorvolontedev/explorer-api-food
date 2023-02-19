const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class ProductCreateService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute({
    thumbnail,
    name,
    category_id,
    ingredients,
    price,
    description,
  }) {
    if (!name || !category_id || !price) {
      throw new AppError("Os campos nome, categoria e preço são obrigatórios.");
    }

    const product = {
      thumbnail: "",
      name,
      category_id,
      ingredients,
      price,
      description,
    };

    if (thumbnail) {
      const diskStorage = new DiskStorage();
      const filename = await diskStorage.saveFile(thumbnail);

      product.thumbnail = filename;
    }

    const productCreated = await this.productRepository.create(product);

    return productCreated;
  }
}

module.exports = ProductCreateService;
