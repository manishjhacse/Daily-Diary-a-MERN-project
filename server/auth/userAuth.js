const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    // const token = req.cookies.token;
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token)
    if (!token || token == undefined) {
      return res.status(401).json({
        success: false,
        message: "Token  is not provided",
      });
    }

    try {
      const payload = jwt.verify(token, process.env.SERCETCODE);
      req.user = payload;
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "Token invalid",
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "something went wrong while verifying token",
    });
  }
};





