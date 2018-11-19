var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CommentModel = require('./comment')

var articleSchema = new Schema({
  title: {
    type : String,
    require : [true, 'Sorry, Title must be filled!']
  } ,
  author:{ type : Schema.Types.ObjectId, ref: 'User'} ,
  description:{
      type : String,
      require : [true, 'Sorry, Title must be filled!']
  },
  image : { type : String},
  comments : [ { type : Schema.Types.ObjectId, ref: 'Comment'}] 
}, {timestamps : true});


articleSchema.pre('remove', function(next){
  let comments = this.comments

  CommentModel.deleteMany({_id : { $in: comments }}, function(err){
    if ( err ) {
      throw err
    }else {
      next()
    }
  })
})


const Article = mongoose.model('Article', articleSchema)


module.exports = Article

