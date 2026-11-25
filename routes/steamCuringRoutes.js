const express = require("express");
const router = express.Router();
const SteamCuringController = require("../controllers/steamCuringController");

// GET /api/steam-curing
router.get("/", SteamCuringController.getSteamCuringData);

module.exports = router;