const express = require('express');
const postRouter = require('./routes/postRoutes');
const viewRouter = require('./routes/viewRoutes');
const ErrorThrower = require('./utils/ErrorThrower');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`));

app.use('/', viewRouter);
app.use('/api/v1/posts', postRouter);

app.all('*', (req, res, next) => {
  next(new ErrorThrower(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
