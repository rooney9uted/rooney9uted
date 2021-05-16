
var mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/nodedb',{useMongoClient: true});
var Schema = mongoose.Schema; 
var userSchema = new Schema({
    name:String,
    password:String
});
exports.user = mongoose.model('users',userSchema); 