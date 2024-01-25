// const { v4: uuid } = require("uuid");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const httpError = require("../models/http_error");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

const createUser = async (req, res, next) => {
  // const err = validationResult(req);
  // if (!err.isEmpty()) {
  //   console.log(err);
  //   return next(new httpError("Invalid inputs", 422));
  // }

  // const { firstName, lastName, username, email, password, profession } =
  //   req.body;

  const {
    name,
    username,
    email,
    password
  } = req.body;

  let existingEmail;
  try {
    existingEmail = await User.findOne({ email: email });
  } catch (err) {
    const error = new httpError(
      "Sign up failed. Please try again, or use a different username.",
      500
    );
    return next(error);
  }

  if (existingEmail) {
    const error = new httpError("Email already in use", 422);
    return next(error);
  }

  const newUser = new User({
    name,
    username,
    email,
    password: bcrypt.hashSync(password, 10)
  });

  try {
    await newUser.save();
  } catch (err) {
    console.log(err.stack);
    const error = new httpError("Failed to create new user, db error or duplicate email", 500);
    return next(error);
  }

  res.status(201).json({ Boolean: true });
};

exports.createUser = createUser;
