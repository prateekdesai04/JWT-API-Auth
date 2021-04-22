const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validation');

// REGISTER USER

router.post('/register', async (req, res) => {
  // Validate
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email is present
  const emailExist = await UserModel.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('E-mail already exists !');

  // Hash the password once validation done
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt); //HASHING PASSWORD

  //Save to DB
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(200).json({ user: savedUser._id });
  } catch (error) {
    res.json({ message: error });
  }
});

// LOGIN USER

router.post('/login', async (req, res) => {
  // Validate
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email is present
  const userExist = await UserModel.findOne({ email: req.body.email });
  if (!userExist) return res.status(400).send('User does not exist !');

  // Check if password is correct
  const validPassword = await bcrypt.compare(
    req.body.password,
    userExist.password
  ); // since we've gotten the record in userExist
  if (!validPassword) return res.status(400).send('Invalid Password !');

  //res.status(200).send('Logged In !!');

  // Create & Add the TOKEN here after login
  const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN_SECRET, {
    expiresIn: 1800,
  }); //created the token // added payload can be multiple also // JWT expires in 30 mins
  res.header('auth-token', token).send(token); // we can also store it in the browser's local storage
});

// ACCESS PRIVATE ROUTES USING THIS - Private routes in a different file, must go through verifyToken

module.exports = router;
