const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({
          errorMessage: "Input Error",
        });
      }
  
      const isExistingUser = await User.findOne({
        email: email,
      });
      if (isExistingUser)
        return res.status(409).json({
          errorMessage: "User already exists",
        });
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const userData = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await userData.save();
      res.json({ message: "user registered successfully" });
    } catch (error) {
      next(error)
    }
  }

const loginUser =  async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          errorMessage: "Invalid Request ! Invaliid Credentials",
        });
      }
      const userData = await User.findOne({ email });
  
      //If the user does not exist
      if (!userData) {
        return res.status(401).json({ errorMessage: "Invalid Credentials" });
      }
  
      //If the user does exist
      const passwordMatch = await bcrypt.compare(password, userData.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ errorMessage: "Invalid Credentials" });
      }
  
      const token = jwt.sign({ id: userData._id }, process.env.SECRET_KEY);
  
      res.cookie("token", token, {httpOnly: true });
      
      res.json({
        message: "User logged in",
        name: userData.name,
        token: token,
      });
    } catch (error) {
      next(error)
    }
  }  

module.exports = {registerUser, loginUser}