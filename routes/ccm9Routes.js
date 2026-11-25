const express = require("express");
const router = express.Router();
const Ccm9Controller = require("../controllers/ccm9Controller");

// GET /api/ccm9
router.get("/", Ccm9Controller.getCcm9Data);

module.exports = router;