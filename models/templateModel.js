const { Schema, model } = require('mongoose');

const TemplateSchema = new Schema({
    title: {
        type: String, required: true
    },
    text: {
        type: String, required: true
    },
    category: {
        type: String, required: true
    },
    price: {
        type: Number, required: true
    },
    file: {
        type: String, required: true
    },
    img: {
        type: String, required: true
    },
    created: {
        type: String, required: true
    },
    language: {
        type: String, required: true
    },
    tags: {
        type: String, required: true
    }
})

module.exports = model('Template', TemplateSchema);