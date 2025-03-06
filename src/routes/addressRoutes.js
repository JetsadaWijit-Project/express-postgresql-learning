const express = require("express");
const router = express.Router();
const addressController = require("../controllers/addressController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/add", authMiddleware, addressController.addAddress);
router.get("/", authMiddleware, addressController.getAddresses);

module.exports = router;
