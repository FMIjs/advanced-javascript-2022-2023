var jwt = require('jsonwebtoken');
const secret = 'Very secret';

module.exports.sign = function (data) {
  return jwt.sign({ data: JSON.stringify(data), exp: Math.floor(Date.now() / 1000) + (60 * 60) }, secret);
};

module.exports.verify = function (token, cb) {
  jwt.verify(token, secret, function (err, decoded) {
    if (err) { return void cb(err); }
    cb(null, decoded);
  });
};
