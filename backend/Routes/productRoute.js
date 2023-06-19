const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProducts,
  deleteProducts,
  getProductDetails,
} = require("../controller/productController");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/product/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route("/products").get(getAllProducts);
router
  .route("/product/:id")
  .put(isAuthenticatedUser,authorizeRoles("admin"),updateProducts)
  .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProducts)
  .get(getProductDetails);

module.exports = router;
