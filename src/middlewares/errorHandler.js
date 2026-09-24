function errorHandler(error, req, res, next) {
  let statusCode = error.statusCode || 500;
  let message = error.message || "Error interno del servidor";

  if (error.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(error.errors)
      .map((item) => item.message)
      .join(", ");
  }

  if (error.code === 11000) {
    statusCode = 409;
    message = "Ya existe un documento con un valor que debe ser único";
  }

  res.status(statusCode).json({
    success: false,
    error: {
      message
    }
  });
}

module.exports = errorHandler;