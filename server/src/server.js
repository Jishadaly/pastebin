require('dotenv').config(); // ← MUST be first

const express = require('express');
const connectDB = require('./config/mongoDb');
const app = require('./app');

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
