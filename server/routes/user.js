const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const {sendEmail} = require('../mailer')

router.post('/send-registration-email', async (req, res) => {
  const { email, code } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    sendEmail(email, code)

    res.status(200).json({ message: 'Email successfully sent' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
})

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.status(200).json({ message: 'User successfully registered' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

module.exports = router;