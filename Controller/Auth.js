const User = require("../models/User");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already Exists",
      });
    }

    // secure password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error in hashing Password",
      });
    }

    // create entry for User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(200).json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    // check the registered user
    let user = await User.findOne({ email });

    // if user doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const checkCorrextPassword = await bcrypt.compare(password, user.password);

    // if password is incorrect
    if (!checkCorrextPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Incorrect password" });
    }

    // if password is correct
    // create jwt token
    const payload = { email: user.email, id: user._id, role: user.role };

    if (await bcrypt.compare(password, user.password)) {
      // password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      user = user.toObject();
      user.token = token;
      // it is use to not show password for security.
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } else {
      // password not match
      return res.status(403).json({
        success: false,
        message: "Password does not match",
      });
    }

    // const token = jwt.sign(payload, process.env.JWT_SECRET, {
    //   expiresIn: "2h",
    // });

    // // it is use to not show password for security.
    // user.password = undefined;

    // res
    //   .cookie("token", token, {
    //     httpOnly: true, // it means we can not access from client side
    //     expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    //   })
    //   .status(200)
    //   .json({
    //     success: true,
    //     message: "Successfully login",
    //     token,
    //     user,
    //   });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Login Failure",
    });
  }
};
