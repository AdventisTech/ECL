// const express = require("express");
// const router = express.Router();

// const {
//     getHptm4Report,
//     getHptm4DaySummary,
//     getHptm4ShiftSummary,
// } = require("../controllers/hptm4Controller");

// router.route("/").get(getHptm4Report);
// router.route("/day-summary").get(getHptm4DaySummary);
// router.route("/shift-summary").get(getHptm4ShiftSummary);


// module.exports = router;


const express = require("express");
const router = express.Router();

const {
    getHptm4Report,
    getHptm4DaySummary,
    getHptm4ShiftSummary,
    getHptm4LastData,
} = require("../controllers/hptm4Controller");

router.route("/").get(getHptm4Report);
router.route("/day-summary").get(getHptm4DaySummary);
router.route("/shift-summary").get(getHptm4ShiftSummary);
router.route("/last-data").get(getHptm4LastData);

module.exports = router;