const jwt = require("jsonwebtoken");

module.exports = function admin(req, res, next) {
  const token = req.header("auth-token");

  if (!token) return res.status(401).send("Access Denied");

  try {
    const secret = process.env.TOKEN_SECRET;
    const decodedToken = jwt.decode(req.header("auth-token"));
    const isAdmin = decodedToken.isAdmin;
    const admin = jwt.verify(token, secret);
    req.user = admin;
    console.log(admin);
    if (isAdmin === false) {
      res.status(401).send("Invalid Credentials");
    }
    next();
  } catch (err) {
    res.status(401).send("Invalid Credentials");
  }
};
