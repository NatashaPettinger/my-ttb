const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
// User Model
const User = require('../db/User');
require('dotenv').config({path: '../config/.env'})

const jwtSecret = process.env.jwtSecret;

/**
 * @route   POST api/login
 * @desc    Login user
 * @access  Public
 */

const login = async (req, res) => {
 
  const { email, password } = req.body;
  
  // Simple validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw Error('User does not exist');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });

    if (!token) throw Error('Couldnt sign the token');
    
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

/**
 * @route   POST api/signup
 * @desc    Register new user
 * @access  Public
 */

const signup = async (req, res) => {
  

  const { name, email, password, confirmPassword } = req.body;

  // Simple validation
  if (!name || !email || !password || !confirmPassword ) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }
  if ( password !== confirmPassword ) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }
  try {
    console.log(1)
    const user = await User.findOne({ email });
    if (user) throw Error('User already exists');
    console.log(2)
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');
    console.log(3)
    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');
    console.log(4)
    const newUser = new User({
      name,
      email,
      password: hash
    });
    console.log(5)
    const savedUser = await newUser.save();

    console.log(5)
    if (!savedUser) throw Error('Something went wrong saving the user');
    console.log(6)
    const token = jwt.sign({ id: savedUser._id }, jwtSecret, {
      expiresIn: 3600000
    });
    console.log(7)
    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

/**
 * @route   GET api/auth/user
 * @desc    Get user data
 * @access  Private
 */

const returnUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

module.exports = {login, signup};

/* 
const passport = require("passport");
const validator = require("validator");
const User = require("../db/User");
const config = require('config')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = config;


exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Simple validation
  const validationErrors = [];
  if (!validator.isEmail(email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    throw Error(validationErrors.join(', '))
  }
  email = validator.normalizeEmail(email, {
    gmail_remove_dots: false,
  });

  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        throw Error(info)
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 });
      if (!token) throw Error("Couldn't sign the token");

      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
        });
    })(req, res, next);

    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.status(200).json({ msg: "logout successful" });
  });
};


/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */

/* exports.signup = async (req, res, next) => {
  try {
    const validationErrors = [];

    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
      
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({
        msg: "Password must be at least 8 characters long",
      });
    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: "Passwords do not match" });
  
    if (validationErrors.length) {
      throw Error(validationErrors.join(', '))
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });
    
  
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    });
    console.log(user)
  
    const savedUser = await User.findOne(
      { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
      (err, existingUser) => {
        if (err) {
          return next(err);
        }
        if (existingUser) {
          return res.status(400).json({ msg: "Account with that email address or username already exists." });
        }
        user.save((err) => {
          if (err) {
            return next(err);
          }
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
          });
        });
      }
    );
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id }, JWT_SECRET, {
      expiresIn: 3600
    });

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        userName: savedUser.userName,
        email: savedUser.email
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
 */