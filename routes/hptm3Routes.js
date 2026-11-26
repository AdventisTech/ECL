const express = require("express");
const router = express.Router();

const {
    getHptm3Report,
    getHptm3DaySummary,
    getHptm3ShiftSummary,
    getHptm3LastData,
} = require("../controllers/hptm3Controller");

router.get("/", getHptm3Report);
router.get("/day-summary", getHptm3DaySummary);
router.get("/shift-summary", getHptm3ShiftSummary);
router.get("/last-data", getHptm3LastData);

module.exports = router;