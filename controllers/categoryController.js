const categoryService = require('../service/templateService');

class CategoryController {

    async create(req, res, next) {
        try {
            const { title } = req.body;
            const category = await categoryService.createCategory(title);
            res.json(category)
        } catch (e) {
            next(e);
        }
    }

    async update(req, res, next) {
        try {
            const { title } = req.body;
            const category = await categoryService.updateCategory(title);
            res.json(category)
        } catch (e) {
            next(e);
        }
    }

    async getCategory(req, res, next) {
        try {
            const category = await categoryService.getAllCategory();
            res.json(category)
        } catch (e) {
            next(e);
        }
    }

    async deleteCategory(req, res, next) {
        try {
            const idCategory = req.params.id;
            const category = await categoryService.deleteCategoryById(idCategory);
            res.json(category)
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new CategoryController();