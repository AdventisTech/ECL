const express = require("express");
const router = express.Router();
const CmlController = require("../controllers/cml1Controller");

// GET /api/cml
router.get("/", CmlController.getCmlData);

module.exports = router;