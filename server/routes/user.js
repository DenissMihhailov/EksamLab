const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const {sendEmail} = require('../mailer')
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (user) => {
  const payload = {
    userId: user._id,
    userEmail: user.email,
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

  return accessToken;
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);

    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
});

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

router.post('/change-password', async (req, res) => {
  const { email, newPassword, oldPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!bcrypt.compareSync(oldPassword, existingUser.password)) {
      return res.status(401).json({ message: 'Old password does not match' });
    }
    
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    existingUser.password = hashedNewPassword;

    await existingUser.save();

    res.status(200).json({ message: 'Password successfully changed' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ message: 'Error changing password' });
  }
});

module.exports = router;