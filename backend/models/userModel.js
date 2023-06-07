const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
                required: true,
                unique: true
    },
    password: {
        type: String,
                required: true
    }
})
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

// static signup method
userSchema.statics.signup = async function(email, password) {

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

module.exports = mongoose.model('User', userSchema)
// user static method for signup user

userSchema.static.signup = async (email, password){
    const exists = await this.findOne({ email })
    if (exitst) {
        throw  Error("User already exists")
    }
}

module.exports = mongoose.model("User", userSchema)