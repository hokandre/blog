var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const { hashingPassword, genSalt} = require('../helpers/brcyrpt')

var userSchema = new Schema({
  name: {
    type : String,
    require : [true, 'Sorry, name must be filled!']
  } ,
  email: {
    type : String,
    require : [true, 'Sorry, email must be filled!']
  } ,
  password:{
      type : String,
      require : [true, 'Sorry, password must be filled!']
  },
  following : [{ type : Schema.Types.ObjectId, ref : 'Article'}] 
}, { timestamps : true });

userSchema.pre('save', function(next){
  let user = this
  
  if( !user.isModified('password')) return next()

  let password = user.password
  user.password = hashingPassword(password, genSalt())
  next()
})

const  User = mongoose.model('User', userSchema)


module.exports =  User

