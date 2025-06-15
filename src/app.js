const express = require('express');
const morgan = require('morgan');

const app = express();
const authRoute= require('./routers/auth.route');
const userRoute = require('./routers/user.route');
const postRoute = require('./routers/post.route');
const commentRoute = require('./routers/comment.route');
const user = require('./controllers/users.controller');
const auth = require('./middlwares/auth.middleware');
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);
app.use('/api/comments',commentRoute);
app.use('/api',postRoute);


module.exports = app;

