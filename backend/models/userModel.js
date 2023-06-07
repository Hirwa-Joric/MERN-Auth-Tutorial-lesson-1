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
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,10}$')).required()
  });
  if (!email || !password) {
    throw new Error("All fields must be completed");
  }
  const { error } = signupSchema.validate({ email, password }, { abortEarly: true });
  if (error) {
    throw new Error(JSON.stringify(error.details));
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw new Error('Email already in use');
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
    
  }
  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email')

  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {

    throw Error('Incorrect password')
  }

  return user
}

module.exports = mongoose.model("User", userSchema)