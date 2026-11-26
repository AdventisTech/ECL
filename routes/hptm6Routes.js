const express = require("express");
const router = express.Router();

const {
    getHptm6Report,
    getHptm6DaySummary,
    getHptm6ShiftSummary,
    getHptm6LastData,
} = require("../controllers/hptm6Controller");

router.get("/", getHptm6Report);
router.get("/day-summary", getHptm6DaySummary);
router.get("/shift-summary", getHptm6ShiftSummary);
router.get("/last-data", getHptm6LastData);

module.exports = router;