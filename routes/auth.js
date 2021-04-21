const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
  // VALIDATE
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
