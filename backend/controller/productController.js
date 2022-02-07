const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { createIndexes, findById } = require("../models/productModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandle");

//admin routes
exports.createProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({
    success: true,
    product,
  });
});

exports.getAllProducts = async (req, res) => {
  const data = await Product.find();
  res.status(200).json({
    success: true,
    data,
  });
};

//admin routes
exports.updateProduct = async (req, res) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    res.status(500).json({
      success: false,
      message: "product is not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    name: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
};

//admin-routes
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await Product.findById(req.params.id).remove();
      res.status(200).json({
        message: "product is deleted sucessfully",
      });
    } else {
      res.status(401).json({
        message: "product is not fouund",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

//get product details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
