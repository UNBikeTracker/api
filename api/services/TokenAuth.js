/**
 * Created by eccarrilloe on 4/05/17.
 */

var jwt = require('jsonwebtoken');

module.exports = {
  generateToken: function(payload,options) {
    var token = jwt.sign(payload, sails.config.session.secret, options);
    return token;
  },

  verifyToken: function(token, callback) {
    return jwt.verify(token, sails.config.session.secret, {}, callback);
  }
}
