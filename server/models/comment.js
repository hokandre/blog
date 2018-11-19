var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
  isi: {
    type : String,
    require : [true, 'Sorry, Title must be filled!']
  } ,
  user:{ type : Schema.Types.ObjectId, ref: 'User'}
},{ timestamps:true });

const Comment = mongoose.model('Comment', commentSchema)

module.exports =  Comment

