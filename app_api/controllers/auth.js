const mongoose = require('mongoose');

const authRegister = function(req, res) {
  const User = mongoose.model('User');

  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })
  .then(user => {
    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: user
      });
  })
  .catch(err => {
    console.error('Registration error:', err);
    res
      .status(400)
      .json({
        message: "Error registering user",
        error: err.message || err
      });
  });
};

const authLogin = function(req, res) {
  const User = mongoose.model('User');

  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Email and password required" });
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found" });
      }

      // Simple password comparison (in production, use bcrypt)
      if (user.password !== req.body.password) {
        return res
          .status(401)
          .json({ message: "Invalid password" });
      }

      res
        .status(200)
        .json({
          message: "Login successful",
          user: {
            _id: user._id,
            name: user.name,
            email: user.email
          }
        });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Error logging in", error: err });
    });
};

module.exports = {
  authRegister,
  authLogin
};
