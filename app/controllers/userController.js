const mongoose = require("mongoose");
const shortid = require("shortid");
const moment = require("moment");
const userModel = mongoose.model("users");
const authModel = mongoose.model("auth");
const checkLib = require("../Libs/checkLib");
const currentTime = require("../Libs/timeLib");
const apiResponse = require("../Libs/responseLib");
const signupLib = require("../Libs/signupLibs");
const signinLib = require("../Libs/signinLibs");
const token = require("../Libs/tokenLibs");
const verifyPassword = require("../Libs/passwordLibrary");
const signupUsers = (req, res) => {
  signupLib
    .validateUser(req, res)
    .then(signupLib.createUser)
    .then((resolve) => {
      delete resolve.password;
      let response = apiResponse.generate(
        false,
        "user is created successfully",
        201,
        resolve
      );
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
};
const signinUsers = (req, res) => {
  let findUser = (req, res) => {
    return new Promise((resolve, reject) => {
      if (req.body.email) {
        userModel.findOne({ email: req.body.email }, (error, userDetails) => {
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
  let validatePassword = (retrievedUserDetails) => {
    return new Promise((resolve, reject) => {
      if (req.body.password) {
        verifyPassword.verifyPassword(
          req.body.password,
          retrievedUserDetails.password,
          (err, res) => {
            if (res) {
              let retrievedUserDetailsObj = retrievedUserDetails.toObject();
              delete retrievedUserDetailsObj.password;
              delete retrievedUserDetailsObj.__v;
              delete retrievedUserDetailsObj._id;
              delete retrievedUserDetailsObj.createdOn;

              let response = apiResponse.generate(
                false,
                "Signed in successfully",
                200,
                retrievedUserDetailsObj
              );
              resolve(response);
            } else {
              let response = apiResponse.generate(
                true,
                "Password or email is invalid",
                404,
                null
              );
              reject(response);
            }
          }
        );
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
  let generateToken = (data) => {
    return new Promise((resolve, reject) => {
      token.tokenGenerate(data, (err, res) => {
        if (res) {
          res.userDetails = data.data;
          let response = apiResponse.generate(false, "Token details", 404, res);
          resolve(response);
        } else {
          reject(err);
        }
      });
    });
  };
  let saveToken = (userDetails) => {
    return new Promise((resolve, reject) => {
      authModel.findOne(
        { userId: userDetails.data.userDetails.userId },
        (err, resp) => {
          console.log("coming here");
          if (err) {
            let response = apiResponse.generate(
              true,
              "unable to save token details",
              404,
              err
            );
            reject(err);
          } else if (checkLib.isEmpty(resp)) {
            let newauthToken = new authModel({
              userId: userDetails.data.userDetails.userId,
              authToken: userDetails.data.token,
              tokenSecret: userDetails.data.tokenSecret,
              generatedDate: Date.now(),
            });
            newauthToken.save((err, newTokenDetails) => {
              if (err) {
                console.log(err)
                res.userDetails = data.data;
                let response = apiResponse.generate(
                  true,
                  "unable to save token details",
                  404,
                  err
                );
                reject(response);
              } else {
                console.log("coming here");
                let responseBody = {
                  token: newTokenDetails.authToken,
                  userDetails: userDetails.data.userDetails,
                };
                console.log("here");
                console.log(responseBody);
                resolve(responseBody);
              }
            });
          } else {
            let responseBody = {
              token: resp.authToken,
              userDetails: userDetails.data.userDetails,
            };
            let response = apiResponse.generate(
              true,
              "User details",
              200,
              responseBody
            );
            resolve(response);
          }
        }
      );
    });
  };

  findUser(req, res)
    .then(validatePassword)
    .then(generateToken)
    .then(saveToken)
    .then((resolve) => {
      let response = apiResponse.generate(
        false,
        "user is signed in successfully",
        200,
        resolve
      );
      res.send(response);
    })
    .catch((err) => {
      res.send(err);
    });
};

module.exports = {
  signupUsers: signupUsers,
  signinUsers: signinUsers,
};
