// const express = require("express");
// const router = express.Router();
// const hptm5Controller = require("../controllers/hptm5Controller");

// router.route("/")
//     .get(hptm5Controller.getHptm5Report);

// router.route("/day-summary")
//     .get(hptm5Controller.getHptm5DaySummary);
    
// router.route("/shift-class-size") // 👈 Add new route
//     .get(hptm5Controller.getHptm5ShiftClassSize);    


// router.route("/shift-summary") // 👈 Add new route
//     .get(hptm5Controller.getHptm5ShiftSummary);    

// module.exports = router;


const express = require("express");
const router = express.Router();
const hptm5Controller = require("../controllers/hptm5Controller");

router.route("/")
    .get(hptm5Controller.getHptm5Report);

router.route("/day-summary")
    .get(hptm5Controller.getHptm5DaySummary);
    
router.route("/shift-class-size") // 👈 Add new route
    .get(hptm5Controller.getHptm5ShiftClassSize);    


router.route("/shift-summary") // 👈 Add new route
    .get(hptm5Controller.getHptm5ShiftSummary);    

router.route("/last-data")
    .get(hptm5Controller.getHptm5LastData);

module.exports = router;