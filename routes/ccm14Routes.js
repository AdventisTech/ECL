const express = require("express");
const router = express.Router();
const Ccm14Controller = require("../controllers/ccm14Controller");

// GET /api/ccm14
router.get("/", Ccm14Controller.getCcm14Data);

module.exports = router;