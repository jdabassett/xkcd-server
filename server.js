'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const databaseHandler = require('./modules/databaseHandler.js');
const xkcdHandler = require('./modules/xkcdHandler.js');

//create server
const app = express();
app.use(cors());
app.use(express.json());

// Import global variables
const PORT = process.env.PORT;
const MONGODB_KEY = process.env.MONGODB_KEY;

//connect to mongodb atlas and verify connection is working
mongoose.connect(MONGODB_KEY);
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',()=> console.log('Mongoose is connected'));

// api requests
app.get('/getComicId/:id',xkcdHandler.getComicId);
app.get('/getRandomComic',xkcdHandler.getRandomComic);

// database requests
app.get('/userRecords',databaseHandler.getUserRecords);
app.post('/postComic',databaseHandler.postComic);
app.delete('/deleteOneComic/:id',databaseHandler.deleteOneComic);
app.delete('/deleteAllComics',databaseHandler.deleteAllComics);

app.use((error,req,res)=>{
  res.status(500).send({error:error.message});
});

app.listen(PORT,()=>console.log(`listening to ${PORT}`));



