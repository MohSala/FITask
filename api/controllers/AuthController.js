/* eslint-disable prefer-arrow-callback */
/* eslint-disable curly */
/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require("passport");
var statusMessage;
module.exports = {
  login: function(req, res) {
    passport.authenticate("local", function(err, user, info) {
      if (err || !user) {
        return res.send({
          message: info.message,
          user
        });
      }
      req.logIn(user, function(err) {
        if (err) res.send(err);
        return res.send({
          message: info.message,
          user
        });
      });
    })(req, res);
  },

  createuser: function(req, res) {
    let data = req.body;
    User.findOrCreate(
      {
        username: data.username,
        email: data.email
      },
      {
        username: data.username,
        email: data.email,
        phone: `+${data.phone}`,
        password: data.password
      },
      (err, existingUser, newUser) => {
        if (err) {
          statusMessage = "ERROR ADDING USER, CHECK YOUR DETAILS";
        }
        if (existingUser) {
          statusMessage = "USER ALREADY EXISTS";
        }
        if (newUser) {
          statusMessage = "USER SUCCESSFULLY CREATED";
        }
        res.json({
          statusMessage
        });
      }
    );
  },

  logout: function(req, res) {
    req.logout();
  }
};
