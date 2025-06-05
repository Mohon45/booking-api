const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const roommateRequestController = require("../controllers/RoommateRequestController");

router.post("/create", auth.verifyToken, roommateRequestController.create);
router.get(
    "/",
    auth.verifyToken,
    roommateRequestController.get_roommate_request_list
);
router.get(
    "/details/:id",
    auth.verifyToken,
    roommateRequestController.get_roommate_request
);
router.put("/update/:id", auth.verifyToken, roommateRequestController.update);
router.delete(
    "/delete/:id",
    auth.verifyToken,
    roommateRequestController.delete
);

module.exports = router;
