const TemplateModel = require('../models/templateModel');

class templateService {

    async createTemplate(title, text, category, price, fileName, imageName, created, language, tags) {
        const template = await TemplateModel.create({ title, text, category, price, file: fileName, img: imageName, created, language, tags })
        return {
            template: template
        }
    }

    async editTemplateById(id, title, text, category, price, fileName, imageName, created, language, tags) {
        const template = TemplateModel.updateOne(
            { _id: id }, { $set: { title, text, category, price, file: fileName, img: imageName, created, language, tags } }
        )
        // findOneAndUpdate
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
}

module.exports = new templateService();