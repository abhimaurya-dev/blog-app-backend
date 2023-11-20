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

// const origin = [
//   "https://blog-app-frontend-azure.vercel.app/",
//   "http://localhost:5173",
// ];

// const corsOptions = {
//   origin: "https://blog-app-frontend-azure.vercel.app/",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
const allowedOrigins = [
  "https://example.com",
  "https://blog-app-frontend-azure.vercel.app/",
];
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header(
      "Access-Control-Allow-Origin",
      "https://blog-app-frontend-azure.vercel.app/"
    );
  } // Replace with your frontend origin
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
  // Add other necessary headers
  next();
});

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
