// const express = require("express");
// const router = express.Router();
// const hptm7Controller = require("../controllers/hptm7Controller");

// router.route("/")
//     .get(hptm7Controller.getHptm7Report);

// module.exports = router;


const express = require("express");
const router = express.Router();
const hptm7Controller = require("../controllers/hptm7Controller");

router.route("/")
    .get(hptm7Controller.getHptm7Report);

router.route("/last-data")
    .get(hptm7Controller.getHptm7LastData);

module.exports = router;