const express = require("express");
const { 
    newOrder, 
    getSingleOrder, 
    myOrder,
    getAllOrders,
    updateOrderStatus,
    deleteOrder, 
} = require("../controllers/orderController");
const router = express.Router();
const { authorizeRoles,isAuthenticatedUser } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser,newOrder);
router.route("/order/:id").get(isAuthenticatedUser,authorizeRoles("admin"),getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser,myOrder)

router.route("/admin/orders").get(isAuthenticatedUser,authorizeRoles("admin"),getAllOrders);

router.route("/admin/update/order/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateOrderStatus);

router.route("/admin/delete/order/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteOrder);

module.exports = router;