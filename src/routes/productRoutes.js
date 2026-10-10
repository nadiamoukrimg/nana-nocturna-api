const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const requireAuth = require("../middlewares/require-auth");
const requireAdmin = require("../middlewares/require-admin");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(requireAuth, requireAdmin, createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(requireAuth, requireAdmin, updateProduct)
  .delete(requireAuth, requireAdmin, deleteProduct);

module.exports = router;
