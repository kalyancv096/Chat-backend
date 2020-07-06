const apiResponse = require("../Libs/responseLib");
const mongoose = require("mongoose");
const userModel = mongoose.model("users");
const checkLib = require("../Libs/checkLib");
let findUser = (req, res) => {
  return new Promise((resolve, reject) => {
    if (req.body.email) {
      userModel.find({ email: req.body.email }, (error, userDetails) => {
        if (error) {
          let response = apiResponse.generate(
            true,
            "Unable to reach out to server",
            500,
            null
          );
          reject(response);
        } else if (checkLib.isEmpty(userDetails)) {
          let response = apiResponse.generate(
            true,
            "Unable to reach out to server",
            500,
            null
          );
          reject(response);
        } else {
          resolve(userDetails);
        }
      });
    } else {
      let response = apiResponse.generate(
        true,
        "Please provide emailID and password",
        404,
        null
      );
      reject(response);
    }
  });
};
let validatePassword = (userDetails) => {
  return new Promise((resolve, reject) => {
    console.log(userDetails.password);

    if (req.body.password) {
      console.log(userDetails.password);
      console.log(req.body.password);
      if (userDetails.password != req.body.password) {
        let response = apiResponse.generate(
          true,
          "Password or email is invalid",
          404,
          null
        );
        reject(response);
      } else {
        let userObj = userDetails.toObject();
        delete userObj.password;
        delete userObj._id;
        let response = apiResponse.generate(
          false,
          "Signed in successfully",
          200,
          userObj
        );
        resolve(response);
      }
    } else {
      let response = apiResponse.generate(
        true,
        "Please provide password",
        404,
        null
      );
      reject(response);
    }
  });
};

module.exports = {
  findUser: findUser,
  validatePassword: validatePassword,
};
