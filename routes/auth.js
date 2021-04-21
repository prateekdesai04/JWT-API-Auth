const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
  // VALIDATE
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
    res.status(200).json(savedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
