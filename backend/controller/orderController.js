const Order = require("../Models/orderModel");
const Product = require("../Models/productModel");
const { findByIdAndRemove } = require("../Models/userModels");
const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");

//create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get Logged in user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {

  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders
  });
});

//get all the orders --- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {

  const orders = await Order.find();
  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});


//update order status --- Admin
exports.updateOrders = catchAsyncErrors(async (req, res, next) => {

  const order = await Order.findById(req.params.id);
  
  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  if(order.orderStatus === "Delivered"){
    return next(new ErrorHandler("You have already delivered this order",400));
  }

  order.orderItems.forEach(async (order) => {
    await updateStock(order.product,order.quantity);
  });

  order.orderStatus = req.body.status;

  if(order.orderStatus == "Delivered"){
    order.deliveredAt = Date.now();
  }

  await order.save({validateBeforeSave: false});
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity){
  const product = await Product.findById(id);

  product.stock -= quantity; 

  await product.save({validateBeforeSave: false});
}


//delete order --- Admin
exports.deleteOrders = catchAsyncErrors(async (req, res, next) => {

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this ID", 404));
  }

  // await order.remove()
  await Order.findByIdAndRemove(req.params.id)

  res.status(200).json({
    success: true,
    order,
  });
});