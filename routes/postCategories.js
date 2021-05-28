const express = require('express');
let router = express.Router();
const CategoryModel = require('../schemas/postCategorySchema');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    CategoryModel.find({})
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err.name));
});

router.get('/:id', async (req, res) => {
    CategoryModel.findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err.name));
})

router.post('/', async (req, res) => {
    const category = new CategoryModel();
    category.name = req.body.name;
    category.description = req.body.description;
    category.save()
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err.name));
})

module.exports = router;