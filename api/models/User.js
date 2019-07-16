/* eslint-disable prefer-arrow-callback */
/* eslint-disable quotes */
/* eslint-disable handle-callback-err */
/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require("bcrypt-nodejs");
module.exports = {
  attributes: {
    email: {
      type: "string",
      isEmail: true,
      required: true,
      unique: true
    },
    username: {
      type: "string",
      required: true,
      unique: true
    },
    password: {
      type: "string",
      required: true
    },
    phone: {
      type: "string",
      unique: true,
      required: true
    },
    orders: {
      collection: "order",
      via: "owner"
    }
  },
  // datastore: "default",
  customToJSON: function() {
    return _.omit(this, ["password"]);
  },
  beforeCreate: (user, cb) => {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {
          return cb(err);
        }
        user.password = hash;
        return cb();
      });
    });
  }
};
