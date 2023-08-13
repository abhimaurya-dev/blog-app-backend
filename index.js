import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Importing Routes
import userRoutes from "./routes/userRoutes.js";

//Importing Middlewares
import { errorMiddleware } from "./middlewares/errorHandler/errorMiddleware.js";

// Express Server Config
const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Using routes
app.use("/newUser", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello! Welcome to blog backend");
});

//Using middlewares
app.use(errorMiddleware);

//  Database connection and setting up server to listen
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
    app.listen(process.env.PORT || 5000, (err) => {
      if (err) {
        return console.log({
          error: "Can't connect to backend server",
          message: err,
        });
      }
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log({
      error: "Can't Connect to mongodb",
      message: err.message,
    });
  });
