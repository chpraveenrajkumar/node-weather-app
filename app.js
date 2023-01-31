require("dotenv").config();
const express = require("express");
const tasksRouter = require("./routes/tasks");
const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();

app.use(express.json());

app.use("/api/v1/tasks", tasksRouter);
app.use(notFound); // handling wild card routes
app.use(errorHandlerMiddleware); // handling errors

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is up and running on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
