const fs = require('fs');
const util = require('util');

module.exports = {
  readdir: util.promisify(fs.readdir),
  readFile: util.promisify(fs.readFile),
  lstat: util.promisify(fs.lstat)
};
