const bcrypt = require("bcrypt");
let saltRounds = 10;
let generatePassword = (password) => {
  let salt = bcrypt.genSaltSync(saltRounds);
  let hashedpwd = bcrypt.hashSync(password, salt);
  return hashedpwd;
};
let verifyPassword = (original, hashed, cb) => {
  bcrypt.compare(original, hashed, (err, res) => {
    if (err) {
      cb(err, null);
    } else {
      console.log("->"+res);
      cb(null, res);
    }
  });
};
module.exports = {
  hashPassword: generatePassword,
  verifyPassword: verifyPassword,
};
