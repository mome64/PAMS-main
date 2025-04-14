const express = require("express");
const cors = require("cors");
require("dotenv").config();
const router = require("./router/index");

const app = express();

// Define CORS options
const corsOptions = {
  origin: "http://localhost:5173",
};

// Add CORS middleware with custom options
app.use(cors(corsOptions));

app.use(express.static("public"));

// Add express.json middleware
app.use(express.json());

// Add router middleware
app.use(router);

const port = process.env.PORT;

// Start the webserver
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = app;
