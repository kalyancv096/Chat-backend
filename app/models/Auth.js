const mongoose = require("mongoose");
const appSchema = mongoose.Schema;

const authModel = new appSchema({
  userId: {
    type: String,
    unique: true,
  },
  authToken: {
    type: String,
    unique: true,
  },
  tokenSecret: {
    type: String,
    unique: true,
  },
  generatedDate: {
    type: Date,
  },
});
module.exports = mongoose.model("auth", authModel);
