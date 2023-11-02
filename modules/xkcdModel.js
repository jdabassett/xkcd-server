'use strict';

const mongoose = require('mongoose');

const xkcdSchema = new mongoose.Schema({
  intYear:{type:Number},
  intMonth:{type:Number},
  intDay:{type:Number},
  intNum:{type:Number,require:true},
  strLink:{type:String},
  strTitle:{type:String,require:true},
  strImg:{type:String,require:true},
  strUserEmail:{type:String,require:true}
})

module.exports = mongoose.model("xkcdModel",xkcdSchema)

