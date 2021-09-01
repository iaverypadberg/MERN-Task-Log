const mongoose = require("mongoose")
const Schema = mongoose.Schema

const passportLocalMongoose = require("passport-local-mongoose")

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})

const userSchema = new Schema({
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  authStrategy: {
    type: String,
    default: "local",
  },
  points: {
    type: Number,
    default: 50,
  },
  tasks:[{
    name:{type:String},
    day:{type:String},
    importance:{type:Number},
    time:{type:Date}
  }],
  refreshToken: {
    type: [Session],
  },
})

//Remove refreshToken from the response
userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken
    return ret
  },
})

userSchema.plugin(passportLocalMongoose)


const User = mongoose.model("User", userSchema)

module.exports = User;