const express = require("express");
const router = express.Router();
const Ccm10Controller = require("../controllers/ccm10Controller");

// GET /api/ccm10
router.get("/", Ccm10Controller.getCcm10Data);

module.exports = router;