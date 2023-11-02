'use strict';

require('dotenv').config();
const xkcdModel = require('./xkcdModel.js')
let cache = require('./cache.js');

let databaseHandler = {};


databaseHandler.getUserRecords = (req,res) => {
  let objUserEmail = {strUserEmail:req.query.strUserEmail}
  xkcdModel
    .find(objUserEmail)
    .then((response)=>{res.status(200).send({comic:response})})
    .catch((error)=>{res.status(404).send({error:error.message})})
};


databaseHandler.postComic = (req,res)=>{
  let objectQuery = {...req.body,strUserEmail:req.query.strUserEmail};
  let strQuery = `userComic:${req.query.strUserEmail}`;
  // console.log(objectQuery);

  if (cache[strQuery]) {
    delete cache[strQuery];
  };

  xkcdModel
    .create(objectQuery)
    .then((response)=>{res.status(201).send(response)})
    .catch((error)=>{res.status(500).send({error:error.message})});
};

databaseHandler.deleteAllComics = (req,res) => {
  let objectQuery = {strUserEmail:req.query.strUserEmail};
  let strPassword = req.body.code;
  let strQuery = `userComic:${req.query.strUserEmail}`;

  if (strPassword===process.env.PASSWORD){
    if (cache[strQuery]){
      delete cache[strQuery];
    };
  
    xkcdModel
      .deleteMany(objectQuery)
      .then((response)=>{res.status(204).send({message:'All comics were successfully deleted.'})})
      .catch((error)=>{res.status(409).send({error:error.message})});
  } else {
    res.status(401).send({error:"Request is unauthorized."})
  };
};

databaseHandler.deleteOneComic = (req,res) => {
  let objectQuery = {_id:req.params.id,strUserEmail:req.query.strUserEmail};
  let strPassword = req.body.code;
  let strQuery = `userComic:${req.query.strUserEmail}`;

  if (strPassword===process.env.PASSWORD){
    if (cache[strQuery]){
      delete cache[strQuery];
    };
  
    xkcdModel
      .deleteOne(objectQuery)
      .then((response)=>{res.status(204).send({message:'Comic was successfully deleted.'})})
      .catch((error)=>{res.status(409).send({error:error.message})});
  } else {
    res.status(401).send({error:"Request is unauthorized."})
  };
};


module.exports = databaseHandler;