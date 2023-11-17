import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// Importing Routes
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

//Importing Middlewares
import { errorMiddleware } from "./middlewares/errorHandler/errorMiddleware.js";

// Express Server Config
const app = express();
dotenv.config();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Using routes
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/category", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Hello! Welcome to blog backend");
});

//Using middlewares
app.use(errorMiddleware);

//  Database connection and setting up server to listen
mongoose
  // eslint-disable-next-line no-undef
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database");
    // eslint-disable-next-line no-undef
    app.listen(process.env.PORT || 5000, (err) => {
      if (err) {
        return console.log({
          error: "Can't connect to backend server",
          message: err,
        });
      }
      // eslint-disable-next-line no-undef
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log({
      error: "Can't Connect to mongodb",
      message: err.message,
    });
  });
