const templateService = require('../service/templateService');
const ApiError = require('../exceptions/apiError')
const uuid = require('uuid')
const path = require('path')
// const unZip = require('../unzip/unZip')
const decompress = require('decompress');
const fs = require('fs');

class TemplateController {
    async create(req, res, next) {
        try {
            const { title, text, category, price, language, tags } = req.body;
            if (!req.files) {
                throw ApiError.BadRequest('Файл не загружен');
            }
            const file = req.files.file;
            const typeFile = file.mimetype.split('/').splice(1, 1);
            const fileName = `${uuid.v4()}.${typeFile}`;
            if (file.mimetype === 'application/zip') {
                file.mv(path.join(__dirname + '/../uploads', 'files/') + fileName, err => {
                    if (err) {
                        throw ApiError.BadRequest('Ошибка при загрузка файла');
                    }
                })
            }
            const buildFile = req.files.build;
            const buildType = buildFile.mimetype.split('/').splice(1, 1);
            const buildName = uuid.v4();
            if (file.mimetype === 'application/zip') {
                file.mv(path.join(__dirname + '/../uploads', 'builds/') + `${buildName}.${buildType}`, err => {
                    if (err) {
                        throw ApiError.BadRequest('Ошибка при загрузка файла');
                    }
                    decompress(path.join(__dirname + '/../uploads', 'builds/') + `${buildName}.${buildType}`, `dist/${buildName}`)
                        .then(files => {
                            console.log('done!');
                        })
                        .catch((e) => {
                            throw ApiError.BadRequest(`Ошибка ${e}`);
                        })
                })
            }
            const imageFile = req.files.image
            const typeImage = imageFile.mimetype.split('/').splice(1, 1)
            const imageName = `${uuid.v4()}.${typeImage}`;
            file.mv(path.join(__dirname + '/../uploads', 'images/') + imageName, err => {
                if (err) {
                    throw ApiError.BadRequest('Ошибка при загрузка файла');
                }
            })

            const created = new Date();
            const templateData = await templateService.createTemplate(title, text, category, price, buildName, fileName, imageName, created, language, tags);
            return res.json(templateData);
        } catch (e) {
            next(e);
        }
    }

    async editTemplate(req, res, next) {
        try {
            const { title, text, category, price, language, tags } = req.body;
            if (!req.files) {
                throw ApiError.BadRequest('Файл не загружен');
            }

            const file = req.files.file;
            const typeFile = file.mimetype.split('/').splice(1, 1);
            const fileName = `${uuid.v4()}.${typeFile}`;
            if (file.mimetype === 'application/zip') {
                file.mv(path.join(__dirname + '/../uploads', 'files/') + fileName, err => {
                    if (err) {
                        throw ApiError.BadRequest('Ошибка при загрузка файла');
                    }
                })
            }
            const buildFile = req.files.build;
            const buildType = buildFile.mimetype.split('/').splice(1, 1);
            const buildName = uuid.v4();
            if (file.mimetype === 'application/zip') {
                file.mv(path.join(__dirname + '/../uploads', 'builds/') + `${buildName}.${buildType}`, err => {
                    if (err) {
                        throw ApiError.BadRequest('Ошибка при загрузка файла');
                    }
                    decompress(path.join(__dirname + '/../uploads', 'builds/') + `${buildName}.${buildType}`, `dist/${buildName}`)
                        .then(files => {
                            console.log('done!');
                        })
                        .catch((e) => {
                            throw ApiError.BadRequest(`Ошибка ${e}`);
                        })
                })
            }
            const imageFile = req.files.image
            const typeImage = imageFile.mimetype.split('/').splice(1, 1)
            const imageName = `${uuid.v4()}.${typeImage}`;
            file.mv(path.join(__dirname + '/../uploads', 'images/') + imageName, err => {
                if (err) {
                    throw ApiError.BadRequest('Ошибка при загрузка файла');
                }
            })

            const idTemplate = req.params.id;
            const created = new Date();
            const templateData = await templateService.editTemplateById(title, text, category, price, buildName, fileName, imageName, created, language, tags, idTemplate);
            return res.json(templateData);
        } catch (e) {
            next(e);
        }
    }

    async deleteTemplate(req, res, next) {
        try {
            const idTemplate = req.params.id;
            const template = await templateService.deleteTemplateById(idTemplate);
            res.json(template)
        } catch (e) {
            next(e);
        }
    }

    async getTemplate(req, res, next) {
        try {
            const template = await templateService.getAllTemplate();
            res.json(template)
        } catch (e) {
            next(e);
        }
    }

    async getByIdTemplate(req, res, next) {
        try {
            const idTemplate = req.params.id;
            const template = await templateService.getTemplateById(idTemplate);
            res.json(template)
        } catch (e) {
            next(e);
        }
    }

    async viewTemplate(req, res, next) {
        try {
            const idTemplate = req.params.id;
            const template = await templateService.viewTemplate(idTemplate);
            res.sendFile(path.resolve(path.join(__dirname + '/../dist', `${template}/build/`), 'main.html'))
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new TemplateController();