const CategoryModel = require('../models/categoryModel');
const ApiError = require('../exceptions/apiError');

class categoryService {

    async createCategory(title) {
        if (!title) {
            throw ApiError.BadRequest(`Поля title: пусто`);
        }
        const category = await CategoryModel.create({ title })
        return { category }
    }

    async updateCategory(title, id) {
        if (!id || !title) {
            throw ApiError.BadRequest('Ошибка: поля пусто');
        }
        const category = await CategoryModel.updateOne({ "_id": id }, { $set: { "title": title } }, { upsert: true })
        return category;
    }

    async deleteCategoryById(_id) {
        if (!id) {
            throw ApiError.BadRequest('Ошибка: поля пусто');
        }
        const category = CategoryModel.deleteOne({ _id })
        return category;
    }

    async getAllCategory() {
        const category = await CategoryModel.find();
        return category;
    }
}

module.exports = new categoryService();