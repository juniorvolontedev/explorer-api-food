const AppError = require("../utils/AppError");

class CategoryCreateService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async execute({ name }) {
    if (!name) {
      throw new AppError("O nome da categoria é obrigatório.");
    }

    const categoryExist = await this.categoryRepository.getCategoryByName(name);

    if (categoryExist) {
      throw new AppError("Já existe uma categoria com esse nome.");
    }

    const categoryCreated = await this.categoryRepository.create({ name });

    return categoryCreated;
  }
}

module.exports = CategoryCreateService;
