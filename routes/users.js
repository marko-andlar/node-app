const express = require('express');
let router = express.Router();
const UserModel = require('../schemas/userSchema');

router.get('/', async (req, res) => {
    UserModel.find({})
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err.name));
});

router.get('/:id', async (req, res) => {
    UserModel.findById(req.params.id)
        .then(result => res.send(result))
        .catch(err => res.status(500).send(err.name));
})

router.post('/', async (req, res) => {
    const user = new UserModel();
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user
        .save()
        .then(result => res.send(result))
        .catch(err => {
            console.log(err);
            res.status(500).send(err.name)
        });
});

module.exports = router;