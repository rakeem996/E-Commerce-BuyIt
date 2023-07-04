const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
} = require("../controller/orderController");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router
  .route("/orders/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleOrder);


router.route("/order/me").get(isAuthenticatedUser, myOrders);

module.exports = router;
