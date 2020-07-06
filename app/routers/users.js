const express = require("express");
const appConfig = require("../../config/appConfig");
const moment = require("moment");
const blogController = require("../controllers/userController");
const auth = require("../middleware/auth");
let baseUrl = `${appConfig.apiVersion}/users`;
let users = (app) => {
  app.post(`${baseUrl}/signup`, blogController.signupUsers);

  /**
 * @api {post} /api/v1/users/signup Retrieve all blogs
 * @apiName get all blogs
 * @apiGroup Blogs
 *
 

 * @apiSuccessExample {json} Success-Response:
                 {
    "error": false,
    "message": "blogs are listed",
    "status": 200,
    "data": [
        {
            "title": "my blog2",
            "views": 0,
            "tags": [],
            "_id": "5eec375986bc296110a70865",
            "blogId": "D8fUsC5Mk",
            "description": "My first blog",
            "bodyHtml": "any HTML content",
            "isPublised": true,
            "category": "comedy",
            "author": "kalyan",
            "created": "2020-06-19T03:56:09.148Z",
            "lastModified": "2020-06-19T03:56:09.148Z",
            "__v": 0
        },]
    }

 */
  app.post(
    `${baseUrl}/signin`,
    auth.isAuthenticated,
    blogController.signinUsers
  );

  /**
* @api {post} /api/v1/users/signup Retrieve all blogs
* @apiName get all blogs
* @apiGroup Blogs
*


* @apiSuccessExample {json} Success-Response:
           {
"error": false,
"message": "blogs are listed",
"status": 200,
"data": [
  {
      "title": "my blog2",
      "views": 0,
      "tags": [],
      "_id": "5eec375986bc296110a70865",
      "blogId": "D8fUsC5Mk",
      "description": "My first blog",
      "bodyHtml": "any HTML content",
      "isPublised": true,
      "category": "comedy",
      "author": "kalyan",
      "created": "2020-06-19T03:56:09.148Z",
      "lastModified": "2020-06-19T03:56:09.148Z",
      "__v": 0
  },]
}

*/
};
module.exports = {
  readRoute: users,
};
