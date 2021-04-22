const router = require('express').Router();
const UserModel = require('../models/User');
const verify = require('./verifyToken'); // get verifyToken here

router.get('/', verify, async (req, res) => {
  //add verify - middleware for authentication
  //   res.json({
  //     posts: {
  //       title: 'My private post',
  //       description: 'This is a private post !!',
  //     },
  //   });
  const loggedUser = await UserModel.findOne({ _id: req.user._id }); //req.user has verified payload in verifyToken
  res.status(200).send(loggedUser);
});

module.exports = router;
