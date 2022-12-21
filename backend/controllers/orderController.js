const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");


//Create New Order
exports.newOrder = catchAsyncError(async(req,res,next)=>{
    const{
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    }=req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt:Date.now(),
        user:req.user._id
    });

    res.status(200).json({
        success:true,
        message:"Order created successfully",
        order,
    });
});

//Get Single Order Details
exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{

    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email");

    if(!order){
        return next(new ErrorHandler("Order not found",404));
    }

    res.status(200).json({
        success:true,
        order,
    })
});

//Get logged in orders
exports.myOrder = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find({user:req.user._id});

    res.status(200).json({
        success:true,
        orders,
    })
});

//Get All Orders (admin route)
exports.getAllOrders = catchAsyncError(async(req,res,next)=>{
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount+=order.totalPrice;
    });

    res.status(200).json({
        success:true,
        totalAmount,
        orders,
    })
});

//Update order status (Admin route)
exports.updateOrderStatus = catchAsyncError(async(req,res,next)=>{

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found",404));
    }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHandler("You have already delivered this order",404));
    }

   order.orderItems.forEach(async(order)=>{
     await updateStock(order.product,order.quantity);
   })

   order.orderStatus = req.body.status;

   if(req.body.status==="Delivered"){
    order.deliveredAt=Date.now();
   }

   await order.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
        message:"Status updated successfully,"
    })
});


async function updateStock(id,quantity){
    const product = await Product.findById(id);

    product.stock-=quantity;

    await product.save({validateBeforeSave:false});
};

exports.deleteOrder = catchAsyncError(async(req,res,next)=>{
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found",404));
    }

    await order.remove();

    res.status(200).json({
        success:true,
        message:"Order deleted successfully"
    })
})