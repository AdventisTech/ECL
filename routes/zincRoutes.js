const express = require("express");
const router = express.Router();
const ZincController = require("../controllers/zincController");

// GET /api/zinc
router.get("/", ZincController.getZincData);

module.exports = router;