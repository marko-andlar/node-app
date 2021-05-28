const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
      maxLength: 100,
      minLength: 5,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    content:{
      maxLength: 3000,
      minLength: 5,
      required: true,
      trim: true,
      type: String,
    },
    created: {
        default: Date.now,
        type: Date,
    },
    edited: {
        default: Date.now,
        type: Date,
    },
    userId:{
      required: true,
      type: mongoose.ObjectId,
    },
    categoryId:{
      required: true,
      type: mongoose.ObjectId,
    },
    likeCount: {
        default: 0,
        type: Number,
    }
  });
  
  const PostModel = mongoose.model('Post', postSchema);

  module.exports = PostModel;