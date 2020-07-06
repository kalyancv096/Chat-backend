const jwt = require("jsonwebtoken");
const userModel = mongoose.model("users");
const jwt = require("jsonwebtoken");
let secret = "mysecret";
let tokenDetails = (data, cb) => {
  try {
    let token = {
      tokenSecret: secret,
      token: jwt.sign(data, secret),
    };
    console.log(token);
    cb(null, token);
  } catch (err) {
    cb(err, null);
  }
};
let verifyToken = (token, tokensecret, cb) => {
  
  jwt.verify(token, tokensecret, (err, verifiedToken) => { 
    if (verifiedToken) {
      userModel.findOne()

      cb(verifiedToken, null)
      
    }
    else { 
      cb(null,err)

    }


  })
}
module.exports = { tokenGenerate: tokenDetails };
