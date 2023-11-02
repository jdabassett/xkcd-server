'use strict';
const axios = require('axios');
const cache = require('./cache.js');
let xkcdHandler = {};


xkcdHandler.getComicId = (req,res) => {
  let strId = req.params.id;
  let strQueryCache = `queryComicId:${strId}`;
  let strUrl = `https://xkcd.com/${`${strId}/`}info.0.json `

  if (strQueryCache in cache) {
    console.log("getComicId:old",strQueryCache)
    res.status(200).send({comic:cache[strQueryCache].comic})
  } else {
    console.log("getComicId:new",strQueryCache)
    axios
      .get(strUrl)
      .then((response)=>{
          let formatedComic = new FormatOneComic(response.data).returnFormatedComic();
          cache[strQueryCache]={};
          cache[strQueryCache].date =Date.now();
          cache[strQueryCache].comic = formatedComic;
          return res.status(200).send({comic:formatedComic});})
      .catch((error)=>{
          res.status(404).send({error:error.message});});
    };

};

xkcdHandler.getRandomComic = async (req,res) => {
  let intRandom = Math.ceil(Math.random()*2849)
  let strUrl = `https://xkcd.com/${`${intRandom}/`}info.0.json`

  axios
    .get(strUrl)
    .then((response)=>{
      let formatedComic = new FormatOneComic(response.data).returnFormatedComic();
      return res.status(200).send({comic:formatedComic});})
    .catch((error)=>{
      res.status(404).send({error:error.message});});
};




module.exports = xkcdHandler;


class FormatOneComic {
  constructor(resComic){
    this.intYear = parseInt(resComic.year);
    this.intMonth = parseInt(resComic.month);
    this.intDay = parseInt(resComic.day);
    this.intNum = parseInt(resComic.num);
    this.strLink = String(resComic.link);
    this.strTitle = String(resComic.safe_title? resComic.safe_title: resComic.title);
    this.strImg = String(resComic.img);
  };
  returnFormatedComic () {
    return {
        intYear:this.intYear,
        intMonth:this.intMonth,
        intDay:this.intDay,
        intNum:this.intNum,
        strLink:this.strLink,
        strTitle:this.strTitle,
        strImg:this.strImg,
    };
  };
};



