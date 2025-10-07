const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, mobile } = req.body;


  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error('Please add all required fields');
  }

  
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

   const user = await User.create({
    name,
    email,
    password,
    role,
    mobile,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  
  const user = await User.findOne({ email });

  
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});


const getAgents = asyncHandler(async (req, res) => {
  if (req.user.role !== 'Admin') {
    res.status(403); 
    throw new Error('User is not authorized to perform this action.');
  }
  const agents = await User.find({ role: 'Agent' }).select('-password');
  res.status(200).json(agents);
});


module.exports = {
  registerUser,
  loginUser,
  getAgents,
};