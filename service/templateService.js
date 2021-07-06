const TemplateModel = require('../models/templateModel');
const ApiError = require('../exceptions/apiError');

class templateService {

    async createTemplate(title, text, category, price, build, fileName, imageName, created, language, tags) {
        const template = await TemplateModel.create({ title, text, category, price, build, file: fileName, img: imageName, created, language, tags })
        return {
            template: template
        }
    }

    async editTemplateById(title, text, category, price, build, fileName, imageName, created, language, tags, id) {
        const template = await TemplateModel.updateOne(
            { "_id": id },
            {
                $set: {
                    "title": title,
                    "text": text,
                    "category": category,
                    "price": price,
                    "build": build,
                    "file": fileName,
                    "img": imageName,
                    "created": created,
                    "language": language,
                    "tags": tags
                }
            },
            { upsert: true }
        )
        return template;
    }

    async deleteTemplateById(_id) {
        const template = TemplateModel.deleteOne({ _id })
        return template;
    }

    async getAllTemplate() {
        const template = await TemplateModel.find();
        return template;
    }

    async getTemplateById(idTemplate) {
        const template = await TemplateModel.findById(idTemplate);
        return template;
    }
    async viewTemplate(pathBuild) {
        const template = await TemplateModel.findOne({ "build": pathBuild });
        if (!template) {
            throw ApiError.BadRequest('Ошибка: сайт не найдено', template);
        }
        return template.build;
    }
}

module.exports = new templateService();