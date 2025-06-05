const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const bookingController = require("../controllers/BookingController");

router.post("/create", auth.verifyToken, bookingController.create);
router.get("/", auth.verifyToken, bookingController.get_booking_list);
router.get("/details/:id", auth.verifyToken, bookingController.get_booking);
router.put("/update/:id", auth.verifyToken, bookingController.update);
router.delete("/delete/:id", auth.verifyToken, bookingController.delete);

module.exports = router;
