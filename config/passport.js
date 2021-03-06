/* eslint-disable handle-callback-err */
/* eslint-disable prefer-arrow-callback */
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  bcrypt = require("bcrypt-nodejs"),
  http = require("http");

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findOne({ id }, function(err, user) {
    cb(err, users);
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passportField: "password"
    },
    function(username, password, cb) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false, { message: "Username not found" });
        }
        // eslint-disable-next-line prefer-arrow-callback
        bcrypt.compare(password, user.password, function(err, res) {
          if (!res) {
            return cb(null, false, { message: "Invalid password" });
          }
          let userDetails = {
            email: user.email,
            username: user.username,
            id: user.id,
            phone: user.phone
          };
          return cb(null, userDetails, { message: "Login Successful" });
        });
      });
    }
  )
);
