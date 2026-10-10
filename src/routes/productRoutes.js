const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const requireAuth = require("../middlewares/require-auth");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(requireAuth, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(requireAuth, updateProduct)
  .delete(requireAuth, deleteProduct);
  
module.exports = router;
