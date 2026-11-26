const express = require("express");
const router = express.Router();
const Hptm1Controller = require("../controllers/hptm1Controller");

// GET /api/hptm1
router.get("/", Hptm1Controller.getTestData);

module.exports = router;