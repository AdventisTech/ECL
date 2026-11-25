const express = require("express");
const router = express.Router();
const CoreShooterController = require("../controllers/coreShooterController");

// GET /api/core-shooter
router.get("/", CoreShooterController.getCoreShooterData);

module.exports = router;