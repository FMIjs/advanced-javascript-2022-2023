const fs = require('fs');

module.exports = function environmentReplacer(source) {
  if (process.env.NODE_ENV === 'production') {
    return fs.readFileSync(this.resourcePath.replace('environment.js', 'environment.prod.js'));
  }
  return source;
}
