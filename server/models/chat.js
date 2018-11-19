var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({
  message: {
    type : String,
  } ,
  name : {
    type : String,
  }
}, { timestamps : true });

const  Chat = mongoose.model('Chat', chatSchema)
module.exports =  Chat

