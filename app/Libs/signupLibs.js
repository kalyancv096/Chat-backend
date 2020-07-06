const apiResponse = require("../Libs/responseLib");
const mongoose = require("mongoose");
const userModel = mongoose.model("users");
const checkLib = require("../Libs/checkLib");
const shortid = require("shortid");
const passwordhashing= require('./passwordLibrary')
let validateUser = (req, res) => {
  return new Promise((resolve, reject) => {
    if (req.body.email) {
      resolve(req);
    } else {
      let response = apiResponse.generate(
        true,
        "please provide mandatory fields",
        404,
        null
      );
      reject(response);
    }
  });
};

const createUser = (req, res) => {
  console.log("inside create user");
  return new Promise((resolve, reject) => {
    userModel.find({ email: req.body.email }).exec((error, result) => {
      if (error) {
        let response = apiResponse.generate(
          true,
          "Unable to create user",
          404,
          null
        );
        reject(response);
      } else if (checkLib.isEmpty(result)) {
        const newUser = new userModel({
          userId: shortid.generate(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          password: passwordhashing.hashPassword(req.body.password),
          email: req.body.email,
          mobileNumber: req.body.mobileNumber,
          createdOn: Date.now(),
        });
        newUser.save((err, result) => {
          console.log(result);
          console.log(err);
          if (err) {
            let response = apiResponse.generate(
              true,
              "Unable to save user",
              404,
              null
            );
            reject(response);
          } else {
            let userObject = newUser.toObject;
            resolve(newUser);
          }
        });
      } else {
        let response = apiResponse.generate(
          true,
          "User cannot be created! User exists ",
          404,
          null
        );
        reject(response);
      }
    });
  });
};
module.exports = {
  validateUser: validateUser,
  createUser: createUser,
};
