'use strict'

const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/duopick?directConnection=true';

mongoose.connect(MONGO_URL)
  .then(() => console.log('mongodb connected'))
  .catch((error) => console.log('mongodb connection error', error.message));

module.exports = mongoose;