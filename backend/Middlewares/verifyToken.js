const jwt = require("jsonwebtoken");

module.exports = function verify(req, res, next) {
  const token = req.header("auth-token");
  const secret = process.env.TOKEN_SECRET;

  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Credentials");
  }
};
