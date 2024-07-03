const User = require("../models/userSchema");
const bcrypt = require("bcryptjs")
// const jwt = require('jsonwebtoken');


const test = (req, res) => {
    res.send("Hello World");
}

const createUser = async (req,res) => {
    try{
        const {username, email, password} = req.body;
        const userByUsername = await User.findOne({username})
        const userByEmail = await User.findOne({email})

        if(userByEmail || userByUsername){
            return res.status(401).json({message: "User already Exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password,salt)

        const user  = await User.create({username,email,password: hashedpassword})
        res.status(200).json({message: "User Created Successfully"})
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: "Intenal Server Error"})
    }
} 

const getUser = async (req,res) => {
    try{
        const user = await User.find();
        res.status(200).json(user);

    }catch(error){
        console.log(error.message)
        res.status(500).json({message: "Intenal Server Error"})
    }
}

const getUserById = async (req,res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);

    }catch(error){
        console.log(error.message)
        res.status(500).json({message: "Intenal Server Error"})
    }
}

const getUserId = async (req, res) => {
    try {
      const { username, password } = req.body;
      try {
        const user = await User.findOne({ username });

        if(!user){
            return res.status(401).json({ message: 'Authentication failed' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
        //     const token = jwt.sign({ userId: user._id }, process.env.JWTSECRET, {
        //         expiresIn: '1d',
        //         });
        //   res.status(200).json(token);
          res.status(200).json(user._id);
        } else {
          res.status(401).json({ message: "Authentication failed" });
        }
      } catch (error) {
        res.status(401).json({ message: "Authentication failed" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

module.exports = {test, createUser, getUser,getUserById, getUserId}