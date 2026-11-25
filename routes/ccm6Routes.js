const express = require("express");
const router = express.Router();
const Ccm6Controller = require("../controllers/ccm6Controller");

// GET /api/ccm6
router.get("/", Ccm6Controller.getCcm6Data);

module.exports = router;