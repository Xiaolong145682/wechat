var mongoose = require("./mongoose.js");

var Schema = mongoose.Schema;


var UserSchema = new Schema({
    email:String,
    nick:String,
    phone:Number,
    password:String,
    socketid:Schema.Types.ObjectId,
    active:{type:Boolean,default:false}
});

var User = mongoose.model('User',UserSchema);
var m = new User;
m.email="1804754@3289";
m.nick="小明";
m.phone=30;
m.password="abc123456789";

  // m.save(function(err, data){
  //   console.log('save ok.');
  //  });

module.exports = User;
