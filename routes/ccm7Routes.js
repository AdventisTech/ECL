const express = require("express");
const router = express.Router();
const Ccm7Controller = require("../controllers/ccm7Controller");

// GET /api/ccm7
router.get("/", Ccm7Controller.getCcm7Data);

module.exports = router;