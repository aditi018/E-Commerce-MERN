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


        const resultPerPage = 8;
        const productsCount = await Product.countDocuments();
        const apifeature =new ApiFeatures(Product.find(),req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
        const products = await apifeature.query;

        res.status(200).json({
            success: true,
            products,
            productsCount
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

//Create new review and update the review
exports.createAndUpdateReview = catchAsyncError(async(req,res,next)=>{

    const{rating,comment,productId}=req.body;

    const review = {
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    };
    const product = await Product.findById(productId);
    
    const isReviewed = product.reviews.find((rev)=> rev.user.toString()===req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach((rev) => {
            if(rev.user.toString()===req.user._id.toString())
            (rev.rating = rating),(rev.comment = comment)
        });
    }else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg =0;

    product.reviews.forEach((rev)=>{
        avg = avg+rev.rating;
    })

    product.ratings = avg/product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    });
});

//Get All product Review
exports.getAllProductReviews = catchAsyncError(async(req,res,next)=>{
    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        success:true,
        reviews: product.reviews
    });
});

exports.deleteReview = catchAsyncError(async(req,res,next)=>{
    const product = Product.findById(req.query.productId);
    
    if(!product){
        return next(new ErrorHandler("Product not found",404));
    }
    product.reviews = [];
    const reviews = product.reviews.filter((rev)=>rev._id.toString() !== req.query.id.toString());

    let avg = 0;

    product.reviews.forEach((rev)=>{
        avg += rev.rating;
    });

    let ratings = 0;

    if(reviews.length ===0){
        ratings = 0;
    } else{
        ratings = avg/reviews.length;
    }
    
   const numOfReviews = product.reviews.length;

   await Product.findByIdAndUpdate(req.query.productId,
    {
    reviews,
    ratings,
    numOfReviews
   },
   {
    new:true,
    runValidators:true,
    useFindAndModify:false,
   });

    res.status(200).json({
        success:true,
        message:"Review deleted successfully"
    })
})
