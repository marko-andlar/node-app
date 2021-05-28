const express = require('express');
let router = express.Router();
const UserModel = require('../schemas/userSchema');
const PostModel = require('../schemas/postSchema');
const ReplyModel = require('../schemas/replySchema');

router.get('/', (req, res) => {
    const query = req.query.postId ? {postId: req.query.postId} : {};
    ReplyModel.find(query)
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err.name));
});

router.get('/:id', (req, res) => {
    ReplyModel.findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err.name));
});

router.post('/', async (req, res) => {
    try{
        const post = await PostModel.findById(req.body.postId);
        const user = await UserModel.findById(req.body.userId);
        if(post && user){
            const reply = new ReplyModel();
            reply.userId = user._id;
            reply.postId = post._id;
            reply.content = req.body.content;
            reply.save()
                .then(result => res.send(result))
                .catch(err => res.status(500).send(err.name));
        }
    }
    catch(err){
        res.status(500).send(err.name);
    }
});

module.exports = router;