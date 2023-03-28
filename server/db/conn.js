
const mongoose = require('mongoose');
require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_CLUSTER = process.env.DB_CLUSTER;

const DB = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_CLUSTER}/test?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
