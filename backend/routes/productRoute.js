const { 
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails, 
    createAndUpdateReview,
    getAllProductReviews,
    deleteReview
} = require("../controllers/productController");
const { authorizeRoles,isAuthenticatedUser } = require("../middleware/auth");

const router = require("express").Router();

router.route("/products").get(getAllProducts);

router.route("/products/details/:id").get(getProductDetails);

router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router.route("/admin/products/update/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);

router.route("/admin/products/delete/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

router.route("/review").put(isAuthenticatedUser,createAndUpdateReview);

router.route("/reviews").get(getAllProductReviews).delete(isAuthenticatedUser,deleteReview);

module.exports = router;