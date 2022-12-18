const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

// const DB = process.env.LOCAL_DATABASE;

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Meiersbook connection established'));

let port = process.env.PORT || 3000;

const server = app.listen(port, function () {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => process.exit(1));
});
