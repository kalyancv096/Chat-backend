let routeHandler = require("../Libs/responseLib");
let response = require("../Libs/responseLib");
const Mongoose = require("mongoose");
let checkLibs = require("../Libs/checkLib");
const jwt = require("jsonwebtoken");
const authModel = mongoose.model("auth");
let isAuthenticated = (req, res, next) => {
  if (req.query.authToken) {
    authModel.findOne({ authToken: authToken }, (err, result) => {
      if (err) {
        let apiResponse = response.generate(
          true,
          "Error fetching Authentication token",
          404,
          null
        );
        res.status(404).send(apiResponse);
      } else if (checkLibs(result)) {
        let apiResponse = response.generate(
          true,
          "Authentication token is not present",
          404,
          null
        );
        res.status(404).send(apiResponse);
      } else {
        jwt.verifyToken(
          result.authToken,
          result.tokenSecret,
          (err, userDetails) => {
            if (err) {
              let apiResponse = response.generate(
                true,
                "Error verifying Authentication token",
                404,
                null
              );
              res.status(404).send(apiResponse);
            } else {
              req.user = { userId: userDetails.data.userId };
              next();
            }
          }
        );
      }
    });
  } else {
    let apiResponse = response.generate(
      true,
      "Authentication token is missing",
      404,
      null
    );
    res.status(404).send(apiResponse);
  }

  console.log("auth middleware");
  //  next();
};
module.exports = {
  isAuthenticated: isAuthenticated,
};
