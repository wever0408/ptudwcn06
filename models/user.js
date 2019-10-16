var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
  fullname: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true }
});



//Export model
module.exports = mongoose.model("User", userSchema);
