const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id)=>{
  return jwt.sign({_id},process.env.SECRETE , {expiresIn: "3d"})
}
//Login users

const loginUser = (req, res) => {
    res.json({mssg:"loging in users"})
}

// signing in users

const signupUser = async (req, res) => {

  const { email, password } = req.body


  


  try {
    const user = await User.signup(email, password)

    // create User
    const token = createToken(user._id)
  
    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports={signupUser,loginUser}