import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js"; //import the user model

const router = express.Router(); //create a router

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body; //destructure the request
  try {
    const userExists = await User.findOne({ email }); //check if user exists
    if (userExists) {
      return res.status(400).json({ message: "User already exists" }); //if user exists return a 400 error
    }
    const user = new User({ name, email, password }); //create a new user
    await user.save(); //save the user

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); //create a token

    res.status(201).json({ username: user.username, token: token }); //return the token
  } catch (error) {
    return res.status(500).json({ message: error.message }); 
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body; //destructure the request

  try {
    const user = await User.findOne({ email }); //find the user by email
    if (!user) {
      return res.status(400).json({ message: "Invalid Email" }); //if user does not exist return a 400 error
    }
    const isMatch = await bcrypt.compare(password, user.password); //compare the password
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" }); //if password does not match return a 400 error
    }

    //json web token
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    }); // create a token

    res.status(200).json({ username: user.name, token: token }); //return the token
    console.log(user.name + "logged in");
  } catch (error) {
    res.status(500).json({ error: "Server error" }); //if there is an error return a 500 error
  }
});

export default router;