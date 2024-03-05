const Product = require("../Models/productModel");
const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const ApiFeatures = require("../Utils/apiFeatures");

//Create product -- Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;

  let product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

//Get all products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 8;
  const productCount = await Product.countDocuments();

  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apiFeatures.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

//update Products --Admmin
exports.updateProducts = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);


  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete Product --Admin
exports.deleteProducts = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);


  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await Product.findByIdAndRemove(req.params.id);

  res.status(200).json({
    success: true,
    message: "product successfully deleted",
  });
});

//get product details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Create new review  or update new review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.body._id,
    name: req.body.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => String(rev.user) === String(req.user._id)
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (String(rev.user) === String(req.user._id)) {
        (rev.rating = rating), (rev.comment = comment);
      }
    });
  } else {
    product.reviews.push(review);
    product.numsOfReviews = product.reviews.length;
  }

  let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg/product.reviews.length;

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success:true
    })
});


//Get All product Reviews

exports.getProductReviews = catchAsyncErrors( async(req, res, next) => {
  console.log(req.query.id)
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }


  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Reviews
exports.deleteProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // console.log(product)

  const reviews = product.reviews.filter(
    (rev) => String(rev._id) !== String(req.query.id)
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;

  const numsOfReviews = reviews.length;

  // await Product.findByIdAndUpdate(
  //   req.query.productId,
  //   {
  //     reviews,
  //     ratings,
  //     numsOfReviews,                    
  //   },
  //   {
  //     new: true,
  //     runValidators: true,
  //     userFindAndModify: false,
  //   }
  // );

  product.rating = ratings;
  product.numsOfReviews = numsOfReviews;
  product.reviews = reviews;

  await product.save({validateBeforeSave: false});

  res.status(200).json({
    success: true,
  });
});
