const { z } = require("zod");

// Create LogIn Object Schema
const logInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(6, { message: "Email must be at least of 6 characters" })
    .max(255, { message: "Email not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least of 6 characters" })
    .max(1024, { message: "Password not be more than 255 characters" }),
});

// Create SignUp Object Schema
const signUpSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(6, { message: "Name must be at least of 6 characters" })
    .max(255, { message: "Name not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(6, { message: "Email must be at least of 6 characters" })
    .max(255, { message: "Email not be more than 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 characters" })
    .max(20, { message: "Phone not be more than 20 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least of 6 characters" })
    .max(1024, { message: "Password not be more than 1024 characters" }),
});

const contactSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(4, { message: "Name must be at least of 6 characters" })
    .max(255, { message: "Name not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(6, { message: "Email must be at least of 6 characters" })
    .max(255, { message: "Email not be more than 255 characters" }),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .max(1024, { message: "Message should not contain more than 1024 characters" }),
});

const courseSchema = z.object({
  title: z
    .string({required_error: "Title is require"})
    .trim()
    .min(6, {message: "Title must be at least of 6 characters"})
    .max(255, {message: "Title not be more than 255 characters"}),
  description: z
    .string({required_error: "Description is require"})
    .trim()
    .min(6, {message: "Description must be at least of 6 characters"})
    .max(255, {message: "Description not be more than 255 characters"}),
  instructor: z
    .string({required_error: "Instructor Name is required"})
    .trim()
    .min(6, {message: "Instructor Name must contain 6 characters"})
    .max(255, {message: "Instructor Name not be more than 255 characters"}),
  price: z
    .number({required_error: "Price is require"})
    .min(1, {message: "Price must be at least  1 character"})
    .max(255, {message: "Price Name not be more than 255 characters"}),
  duration: z
    .string({required_error: "Duration is require"})
    .trim()
    .min(1, {message: "Duration must be at least 1 charcter"})
    .max(255, {message: "Instructor Name not be more than 255 characters"}),
  image: z
    .string({required_error: "Image is require"})
    .trim()
})

module.exports = { signUpSchema, logInSchema, contactSchema, courseSchema };
