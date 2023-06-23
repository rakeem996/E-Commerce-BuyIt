const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { newOrder, getSingleOrder, myOrder } = require("../controller/orderController");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);

router.route("/orders/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser,myOrder);

module.exports = router;