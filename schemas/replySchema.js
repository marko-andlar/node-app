const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    postId: {
        required: true,
        type:mongoose.ObjectId,
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
    likeCount: {
        default: 0,
        type: Number,
    }
});

const ReplyModel = mongoose.model('Reply', replySchema);

module.exports = ReplyModel;