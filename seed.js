"use strict";

require('dotenv').config();
const mongoose = require('mongoose');
const xkcdModel = require('./modules/xkcdModel.js')
const MONGODB_KEY = process.env.MONGODB_KEY;

mongoose.connect(MONGODB_KEY)

async function seed() {
  await xkcdModel.create({
    intYear:2023,
    intMonth:10,
    intDay:27,
    intNum:1111,
    strLink:'boogersLink',
    strTitle:'boogersTitle',
    strAlt:"boogersAlt",
    strImg:'boogersImg',
    strUserEmail:'jacobbassett@gmail.com',
  });
  mongoose.disconnect();
  console.log('saved record')
};

seed();
