const express = require("express");
const router = express.Router();
const MouldShopController = require("../controllers/mouldShopController");

// GET /api/mould-shop
router.get("/", MouldShopController.getMouldShopData);

module.exports = router;