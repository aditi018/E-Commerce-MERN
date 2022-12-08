const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");

//Create New Product
exports.createProduct = catchAsyncError(
    async (req, res, next) => {

        req.body.user = req.user.id;

        const product = await Product.create(req.body);

        res.status(200).json({
            success: true,
            product
        })
    }
);

// Get All Product
exports.getAllProducts = catchAsyncError(
    async (req, res) => {


        const resultPerPage = 10;
        const productCount = await Product.countDocuments();
        const apifeature =new ApiFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
        const products = await apifeature.query;

        res.status(200).json({
            success: true,
            products,
            productCount
        })
    }
)

//Get Product Details
exports.getProductDetails = catchAsyncError(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        res.status(200).json({
            success: true,
            product
        })
    }
)

//Update The Product
exports.updateProduct = catchAsyncError(
    async (req, res, next) => {
        let product = Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404))
        }
        product = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, useValidator: true, useFindAndModify: false });
        res.status(200).json({
            success: true,
            product
        })
    }
)
 

//Delete Product
exports.deleteProduct = catchAsyncError(
    async (req, res, next) => {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHandler("Product Not Found", 404));
        }

        await product.remove();
        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    }
)