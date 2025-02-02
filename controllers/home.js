const Contact = require("../models/contact-model");
const User = require("../models/user-model");
const Course = require("../models/course-model")
const bcrypt = require("bcryptjs");

// Controllers
// In an Express.js application, a "controller" refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to clients. They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.

const home = async (req, res) => {
  try {
    res.status(200).send("This is Registration and Authentication page info");
  } catch (error) {
    res.status(500).json("internal server error at register");
  }
};

// Registration logic
// 1. Get Registration Data: Retrieve user data (username, email, password)
// 2. Check Email Existence: Check if the email is already registered.
// 3. Hash Password: Securely hash the password.
// 4. Create User: Create a new user with hashed password.
// 5. Save to DB: Save user data to the database.
// 6. Respond: Respond with "Registration Successful" or handle errors.

const register = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;

    // Check if user already exists
    const userExist = await User.findOne({ email });

    if (userExist) {
      const error = {
        status: 400,
        message: "Email Already Exist",
        extraDetails: "Create account with another email",
      };
      return next(error); // Return to exit the function
    }

    // Create new user
    const userCreated = await User.create({ username, email, phone, password });

    // Respond with success message and token
    res.status(201).json({
      message: "Registration Successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });

  } catch (error) {
    // Pass the error to the error-handling middleware
    next({
      status: 500,
      message: "Internal server error at register",
      extraDetails: error.message,
    });
  }
};


// Login Logic
const login = async(req, res, next) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({email});

        if(!userExist) {
            // res.status(500).json({message: "Invalid Credentials"});
            const error = {
              status: 500,
              extraDetails: "Invalid Credentials"
            }
            next(error);
        }
        
        const isValid = await userExist.comparePassword(password);
        
        if(isValid) {
            res.status(200).json({
                message: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({
                message: "Invalid email or password"
            })  
        }

    } catch(err) {
        res.status(500).json({message: "internal server error at register"});
    }
}

// contact logic
const contact = async (req, res) => {
  const contactInfo = req.body;

  try {
    const contactData = await Contact.create(contactInfo);
    res.status(200).json({message: "Successfully Submitted"});
  } catch(error) {
    res.status(500).json({message: "Message Not Delivered"});
  }
}


// user logic
const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({userData});

  } catch (error) {
    return res.status(401).json( {message: "Error from user route"});
  }
};

// course logic
const course = async(req, res, next) => {
  try {
    const response = await Course.find();
    if(!response) {
      return res.status(200).json({message: "No Course Found"})
    }
    return res.status(200).json(response);
  } catch (error) {
    next(error)
  }
}


module.exports = { home, register, login, contact, user, course};
