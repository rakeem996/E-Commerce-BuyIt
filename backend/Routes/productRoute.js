const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProducts,
  getProductDetails,
} = require("../controller/productController");

const router = express.Router();

router.route("/product/new").post(createProduct);
router.route("/products").get(getAllProducts);
router
  .route("/product/:id")
  .put(updateProducts)
  .delete(deleteProducts)
  .get(getProductDetails);

module.exports = router;
