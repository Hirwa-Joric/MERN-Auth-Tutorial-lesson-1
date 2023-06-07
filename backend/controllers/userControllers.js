const User = require("../models/userModel")
const  Joi = require("joi")

//Login users

const loginUser = (req, res) => {
    res.json({mssg:"loging in users"})
}

// signing in users

const signupUser = async (req, res) => {
  const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().password().min(3).max(10).required()
  })

  const { email, password } = req.body

  if (!email || !password) { 
    throw Error("all fields must be completed")
  }
  
  const {error} = signupSchema.validate(email,password,{abortEarly:true})

  if (error) {
    throw Error(error)
  }

  try {
    const user = await User.signup(email, password)

    res.status(200).json({email, user})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports={signupUser,loginUser}