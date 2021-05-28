const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;
const posts = require('./routes/posts');
const users = require('./routes/users');
const categories = require('./routes/postCategories');
const replies = require('./routes/replies');
const auth = require('./routes/auth');
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/forum', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected successfuly to db.");
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cookieParser());
app.use(express.json());
app.use('/posts', posts);
app.use('/replies', replies);
app.use('/users', users);
app.use('/categories', categories);
app.use('/auth', auth);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
