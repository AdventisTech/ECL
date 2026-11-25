const express = require("express");
const router = express.Router();
const dimRejectionReasonsController = require("../controllers/dimRejectionReasonsController");

router.route("/")
    .get(dimRejectionReasonsController.getAllRejectionReasons)
    .post(dimRejectionReasonsController.createRejectionReason);

router.route("/:id")
    .get(dimRejectionReasonsController.getRejectionReasonById)
    .put(dimRejectionReasonsController.updateRejectionReason)
    .delete(dimRejectionReasonsController.deleteRejectionReason);

module.exports = router;