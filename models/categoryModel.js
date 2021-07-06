const { Schema, model } = require('mongoose');

const CategorySchema = new Schema({
    title: {
        type: String, required: true
    },
})

module.exports = model('Category', CategorySchema);