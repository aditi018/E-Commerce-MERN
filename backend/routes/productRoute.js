const { getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails} = require("../controllers/productController");
const { authorizeRoles,isAuthenticatedUser } = require("../middleware/auth");

const router = require("express").Router();

router.route("/products").get(getAllProducts);
router.route("/products/details/:id").get(getProductDetails);
router.route("/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);
router.route("/products/update/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);
router.route("/products/delete/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

module.exports = router;