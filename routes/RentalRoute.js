const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth");
const rentalController = require("../controllers/RentalController");

router.post("/create", auth.verifyToken, rentalController.create);
router.get("/", auth.verifyToken, rentalController.get_rental_list);
router.get("/details/:id", auth.verifyToken, rentalController.get_rental);
router.put("/update/:id", auth.verifyToken, rentalController.update);
router.delete("/delete/:id", auth.verifyToken, rentalController.delete);

module.exports = router;
