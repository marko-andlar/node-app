const jwt = require("jsonwebtoken");

function auth(req, res, next){
    const token = req.cookies.token;
    console.log(req.cookies);
    console.log(req.headers);
    if(!token)
        return res.status(401).send('Access denied. No token provided.');

    try{
        const decode = jwt.verify(token, 'myAccessTokenKey');
        req.user = decode;
        next();
    }
    catch(err){
        res.status(400).send('Invalid token');
    }
}

module.exports = auth;