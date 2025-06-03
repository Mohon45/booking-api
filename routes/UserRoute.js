const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/UserController");

router.post("/create", auth.verifyToken, userController.create);
router.get("/", auth.verifyToken, userController.get_user_list);
router.get("/details/:id", auth.verifyToken, userController.get_user);
router.put("/update/:id", auth.verifyToken, userController.update);
router.delete("/delete/:id", auth.verifyToken, userController.delete);

module.exports = router;
