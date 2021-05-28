const express = require('express');
let router = express.Router();
const UserModel = require('../schemas/userSchema');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'myAccessTokenSecret';

router.post('/', async(req, res) => {
    const username = req.body.username;
    console.log(username);
    const user = await UserModel.findOne({username});
    console.log(user);
    user.comparePassword(req.body.password, (err, isMatch) =>{
        if(isMatch){
            const accessToken = jwt.sign({username: user.username}, accessTokenSecret);
        console.log("sent jwt");
        res.send({token: accessToken});
        }
        else
        res.send('User does not exist');
    });
})

module.exports = router;