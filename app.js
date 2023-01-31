require("dotenv").config();
const express = require("express");
const tasksRouter = require("./routes/tasks");
const connectDB = require("./db/connect");

const app = express();

app.use(express.json);

app.use("/api/v1/tasks", tasksRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(
      process.env.PORT,
      console.log("server is up and running on port 5000")
    );
  } catch (error) {
    console.log(error);
  }
};

start();
