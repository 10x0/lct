const express = require("express");
const {
  registerUser,
  loginUser,
  // logoutUser,
  forgotPassword,
  resetPassword,
  getSelfDetails,
  getSingleUser,
  getAllUser,
  deleteUser,
  updateUser,
  updateProfile,
  changePassword,
} = require("../controllers/userController");
const { authenticated, authorized } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// router.route("/logout").get(logoutUser);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").put(resetPassword);

router.route("/self").get(authenticated, getSelfDetails);
router.route("/self/updateProfile").put(authenticated, updateProfile);
router.route("/self/changePassword").put(authenticated, changePassword);

router
  .route("/admin/users")
  .get(authenticated, authorized("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(authenticated, authorized("admin"), getSingleUser)
  .put(authenticated, authorized("admin"), updateUser)
  .delete(authenticated, authorized("admin"), deleteUser);

module.exports = router;
