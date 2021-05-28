const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name:{
        maxLength: 50,
        minLength: 2,
        require: true,
        trim: true,
        type: String,
        unique: true
    },
    description:{
        maxLength: 255,
        minLength: 2,
        require: true,
        trim: true,
        type: String,
        unique: true
    }
});

const CategoryModel = mongoose.model('PostCategory', categorySchema);

module.exports = CategoryModel;