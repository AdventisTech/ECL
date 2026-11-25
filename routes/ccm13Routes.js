const express = require("express");
const router = express.Router();
const Ccm13Controller = require("../controllers/ccm13Controller");

// GET /api/ccm13
router.get("/", Ccm13Controller.getCcm13Data);

module.exports = router;