const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');

const authRoutes = require('./routes/auth');

// USING BODY PARSER (A Middleware) - Parses the request body
app.use(express.urlencoded({ extended: true })); // here this will execute when we hit any request, this is a middleware
app.use(express.json());

// CREATE ROUTES
app.use('/users', authRoutes);

// CONNECT TO DB
mongoose.connect(
  process.env.DB_URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => console.log('Connected to DB !')
);

// Listen
app.listen('4200', () => console.log('Server Up and Running...'));
