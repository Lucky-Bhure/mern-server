const express = require("express");
const { home, register, login, contact, user, course } = require("../controllers/home");
const validate = require("../middleware/validate-middleware");
const {signUpSchema, logInSchema, contactSchema, courseSchema} = require("../validators/auth-validator");
const userMiddleware = require("../middleware/user-middleware");

// express.Router()
const router = express.Router();

// In Express.js, express.Router() is a mini Express application without all the server configurations but with the ability to define routes, middleware, and even have its own set of route handlers. It allows you to modularize your routes and middleware to keep your code organized and maintainable.
// https://expressjs.com/en/guide/routing.html
// Use the express.Router class to create modular, mountable route handlers. A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a "mini—app".

router.route("/").get(home);

router.route("/register").post(validate(signUpSchema), register);
router.route("/login").post(validate(logInSchema), login);
router.route("/contact").post(validate(contactSchema), contact);
router.route("/course").get(course);
router.route("/user").get(userMiddleware, user);

module.exports = router;

