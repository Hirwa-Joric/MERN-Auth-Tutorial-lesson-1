const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const  Joi = require("joi")


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

// user static method for signup user

userSchema.statics.signup = async function(email, password) {

    const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().password().min(3).max(10).required()
    })
    if (!email || !password) { 
    throw Error("all fields must be completed")
    }
  
    const {error} = signupSchema.validate(email,password,{abortEarly:true})

  if (error) {
    throw Error(error)
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}
module.exports = mongoose.model("User", userSchema)