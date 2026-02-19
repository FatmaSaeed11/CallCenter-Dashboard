// seedUser.js
const bcrypt = require('bcrypt');
const User = require('./models/User');
const mongoose = require('mongoose');

mongoose.connect("your_mongo_url");

async function seed() {
  const hash = await bcrypt.hash("123456", 10);

  await User.create({
    name: "Test Employee",
    email: "employee@test.com",
    password: hash,
    role: "employee"
  });

  console.log("User created");
  process.exit();
}

seed();
