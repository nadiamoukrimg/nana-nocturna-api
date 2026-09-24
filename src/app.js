require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API de Nana Nocturna funcionando"
  });
});

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;