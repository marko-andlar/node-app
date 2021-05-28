const express = require('express');
let router = express.Router();
const UserModel = require('../schemas/userSchema');
const CategoryModel = require('../schemas/postCategorySchema');
const PostModel = require('../schemas/postSchema');


router.get('/', (req, res) => {
  const query = req.query.categoryId ? {
    categoryId : req.query.categoryId  
  } : {};
  PostModel.find(query)
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err.name));
});

router.get('/:id', async (req, res) => {
  PostModel.findById(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err.name));
});

router.post('/', async (req, res) => {
  try{
    const user = await UserModel.findById(req.body.userId);
    const category = await CategoryModel.findById(req.body.categoryId);
    if(user && category){
      const post = new PostModel();
      post.userId = user._id;
      post.categoryId = category._id;
      post.title = req.body.title;
      post.content = req.body.content;
      post.save()
        .then(result => res.send(result))
        .catch(err => err.status(500).send(err.name));
    }
  }
  catch{
    res.status(500).send(err.name);
  }
});

module.exports = router;