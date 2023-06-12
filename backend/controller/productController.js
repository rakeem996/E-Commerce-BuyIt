const Product = require("../Models/productModel");
const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError")
//Create product -- Admin
exports.createProduct = catchAsyncErrors(async (req,res,next) => {
    let product = await Product.create(req.body);

    res.status(200).json({
        success: true,
        product
    })
})

//Display all products
exports.getAllProducts = catchAsyncErrors(async (req,res) => {

    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
})

//update Products --Admmin
exports.updateProducts = catchAsyncErrors(async (req,res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

})

//delete Product --Admin
exports.deleteProducts = catchAsyncErrors(async(req,res,next) => {

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    product = await Product.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: true,
        message: "product successfully deleted"
    })
    
})

//get product details

exports.getProductDetails = catchAsyncErrors(async(req,res,next) =>{

    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})