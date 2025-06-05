const { Router } = require("express");
const auth = require("../middleware/auth");
const router = Router();

const authController = require("../controllers/AuthController");

router.post("/signup", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get(
    "/getLoggedInUser",
    auth.verifyToken,
    authController.getLoggedInUser
);

module.exports = router;
