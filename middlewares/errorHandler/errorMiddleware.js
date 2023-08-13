export const errorMiddleware = (err, req, res, next) => {
  // console.log(err);
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  if (err.name === "ValidationError") {
    err.message = err.message;
    err.statusCode = 403;
  }
  if (err.code === 11000) {
    err.message = "Username already exist";
    err.statusCode = 403;
  }
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
