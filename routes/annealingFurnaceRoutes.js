const express = require("express");
const router = express.Router();
const AnnealingFurnaceController = require("../controllers/annealingFurnaceController");

// GET /api/annealing-furnace
router.get("/", AnnealingFurnaceController.getAnnealingData);

module.exports = router;