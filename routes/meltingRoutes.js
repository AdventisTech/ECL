const express = require("express");
const router = express.Router();
const MeltingController = require("../controllers/meltingController");

// GET /api/melting
router.get("/", MeltingController.getMeltingData);

module.exports = router;