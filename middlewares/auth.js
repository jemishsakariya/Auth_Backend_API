const jwt = require("jsonwebtoken");
require("dotenv").config();

// next => it is use for if one middleware are close then next middleware is call
exports.auth = (req, res, next) => {
  try {
    // extract jwt token
    // if token is inserted in cookie then we can use => req.cookies.token
    const token = req.body.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token Missing",
      });
    }

    // verify the token
    try {
      // it decode the token
      const decodePayload = jwt.verify(token, process.env.JWT_SECRET);

      // here we insert decoded jwt token info which include "role" and that we are using in verifying the role in next auth.
      // we are stroring req.key in payload
      req.user = decodePayload;
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong,while verifying the token",
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role != "Student") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Students",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role is not matching",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role != "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is protected route for Admin",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User role is not matching",
    });
  }
};
