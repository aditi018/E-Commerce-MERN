const router = require("express").Router();
const {
    registerUser,
    loginUser,logout, 
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateUserProfile
} = require("../controllers/userController");

const {isAuthenticatedUser} = require("../middleware/auth");


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);
router.route("/password/update").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/getUser").get(isAuthenticatedUser,getUserDetails);

router.route("/password/update").put(isAuthenticatedUser,updatePassword)

router.route("/update/profile").put(isAuthenticatedUser,updateUserProfile);

module.exports = router;