const { Router } = require("express");
const auth = require("../middleware/auth");
const router = Router();

const authController = require("../controllers/authController");

router.post("/signup", authController.register);
router.post("/login", authController.login);
router.get("/getGoogleUserInfo", authController.googleUserInfo);
router.post("/resetPassword", authController.resetPassword);
router.post("/logout", authController.logout);
router.get(
    "/getLoggedInUser",
    auth.verifyToken,
    authController.getLoggedInUser
);

module.exports = router;
