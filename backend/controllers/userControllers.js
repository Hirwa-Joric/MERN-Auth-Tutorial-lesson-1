const User = require("../models/userModel")

//Login users

const loginUser = (req, res) => {
    res.json({mssg:"loging in users"})
}

// signing in users

const signupUser = async (req, res) => {
  
  const {email, password} = req.body

  try {
    const user = await User.signup(email, password)

    res.status(200).json({email, user})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports={signupUser,loginUser}