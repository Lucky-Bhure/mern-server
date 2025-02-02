// connecting .env file with server
require("dotenv").config();  
const express = require("express");
const authRouter = require("./router/auth-registration");
const adminRouter = require("./router/admin-router");
const connectDB = require("./utils/database");
const errorMiddleware = require("./middleware/error-middleware");
const cors = require("cors")

const app = express();
const PORT = 5001;

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: "PATCH, PUT, DELETE, GET, POST, HEAD",
    credentials: true,
  }

app.use(cors(corsOptions));

app.use(express.json());
// This line of code adds "Express middleware" that parses incoming request bodies with JSON payloads. It's important to place this before any routes that need to handle JSON data in the request body. This middleware is responsible for parsing JSON data from requests, and it should be applied at the beginning of your middleware stack to ensure it's available for all subsequent route handlers.

// Mount the Router: To use the router in your main Express app, you can "mount' it at a specific URL prefix
app.use("/api/auth-registration", authRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Connecting errorMiddleware
app.use(errorMiddleware);

// Connection with Database
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});
