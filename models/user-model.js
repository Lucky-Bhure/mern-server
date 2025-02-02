const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Creating Schema for user registration
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// secure password with bcryptjs before save
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, saltRound);
    user.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

// What is JWT?

// JSON Web Tokens (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object
// JWTs are often used for authentication and authorization in web applications.
// 1. **Authentication:** Verifying the identity of a user or client.
// 2. **Authorization:** Determining what actions a user or client is allowed to perform.

// **Components of a JWT:

// Header: Contains metadata about the token, such as the type of token and the signing algorithm being used.
// Payload: Contains claims or statements about an entity (typically, the user) and additional data. Common claims include user ID, username, and expiration time.
// Signature: To verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way, a signature is included.

// Json Web Token
// Tokens, such as JWTs (JSON Web Tokens), are typically not stored in the database along with other user details. Instead, they are issued by the server during the authentication process and then stored on the client-side (e.g., in cookies or local storage) for later use.

userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


// Define Collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;
