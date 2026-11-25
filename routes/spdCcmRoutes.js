const express = require("express");
const router = express.Router();
const {
    getAllRecords,
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord
} = require("../controllers/spdCcmController");

router.route("/")
    .get(getAllRecords)
    .post(createRecord);

router.route("/:id")
    .get(getRecordById)
    .put(updateRecord)
    .delete(deleteRecord);

module.exports = router;