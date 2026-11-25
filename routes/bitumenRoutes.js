const express = require("express");
const router = express.Router();
const BitumenController = require("../controllers/bitumenController");

// GET /api/bitumen
router.get("/", BitumenController.getBitumenData);

module.exports = router;