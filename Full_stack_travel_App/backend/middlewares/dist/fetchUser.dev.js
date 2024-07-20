"use strict";

var jwt = require("jsonwebtoken");

require('dotenv').config();

var fetchuser = function fetchuser(req, res, next) {
  var token, data;
  return regeneratorRuntime.async(function fetchuser$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.header("auth-token");

          if (!token) {
            res.status(401).send({
              errors: "Please authenticate using a valid token"
            });
          }

          try {
            data = jwt.verify(token, process.env.JWT_SECRET);
            req.user = data.user;
            next();
          } catch (error) {
            res.status(401).send({
              errors: "Please authenticate using a valid token"
            });
          }

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = fetchuser;