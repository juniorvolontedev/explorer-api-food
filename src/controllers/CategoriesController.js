const CategoryRepository = require("../repositories/CategoryRepository");
const CategoryCreateService = require("../services/CategoryCreateService");

class CategoriesController {
  async create(request, response) {
    const { name } = request.body;

    const categoryRepository = new CategoryRepository();
    const categoryCreateService = new CategoryCreateService(categoryRepository);
    await categoryCreateService.execute({ name });

    return response.status(201).json("Categoria criada com sucesso.");
  }
}

module.exports = CategoriesController;
