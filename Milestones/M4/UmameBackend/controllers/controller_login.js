const httpError = require("../models/http_error");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  const { username, password } = req.body;

  let user;
  try {
    console.log("Checking...");
      user = await User.findOne({ $or: [
          {email: username},
          {username: username}
        ]});
  } catch (err) {
    console.log("Can't find username");
    const error = new httpError("Login failed. Please try again.", 500);
    return next(error);
  }

  if (!user) {
    const error = new httpError(
        "Login failed. Invalid username or email.",
        401
    );
    return next(error);
  }

  // Checks if password is same as un-hashed password in db
  let passwordValid = bcrypt.compareSync(
      password,
      user.password,
  );

  //
  if (!passwordValid) {
    const error = new httpError(
      "Login failed. Invalid password.",
      401
    );
    return next(error);
  }

  res.status(201).json({
    user,
  });
};

exports.login = login;
