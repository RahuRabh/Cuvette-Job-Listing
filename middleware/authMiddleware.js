const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token && token.length < 2) {
      return res.status(401).json({ message: "Unathorized access" });
    }
    const decode = jwt.verify(token[1], process.env.SECRET_KEY);
    const isUserValid = User.findById(decode.userId);

    if (!isUserValid) {
      return res.status(401).json({ message: "Unathorized access" });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyToken;
