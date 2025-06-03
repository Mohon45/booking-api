const jwt = require("jsonwebtoken");
const { httpResponse } = require("../utils/httpResponse");

const auth = {
  verifyToken: (req, res, next) => {
    const authToken = req.cookies.token;
    const token = authToken;
    // if (token === null) return res.status(401).json(httpResponse('error', {}, 'User not logged in.' ));
    if (token === null) {
      // return res.redirect('/login');
      return res
        .status(401)
        .json(httpResponse("error", {}, "User not logged in."));
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res
          .status(401)
          .json(httpResponse("error", {}, "Token expired."));
        // return res.redirect('/login');
      }

      // console.log("user", user);
      req.user = user;
      next();
    });
  },
  checkPermission: (req, res, next) => {
    const authToken = req.cookies.token;
    const token = authToken;
    if (token === null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },
};

module.exports = auth;
