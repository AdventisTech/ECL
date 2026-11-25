const express = require("express");
const router = express.Router();
const Ccm8Controller = require("../controllers/ccm8Controller");

// GET /api/ccm8
router.get("/", Ccm8Controller.getCcm8Data);

module.exports = router;