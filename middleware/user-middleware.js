const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const userMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized HTTP, token not found" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }

    req.user = userData;
    req.token = jwtToken;
    req.userId = userData._id;

    next();
} catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid Token" });
}

};

module.exports = userMiddleware;
