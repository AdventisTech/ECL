const express = require("express");
const router = express.Router();
const {
    getAllRecords,
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord
} = require("../controllers/ccm01Controller"); //[cite: 16]

router.route("/")
    .get(getAllRecords)
    .post(createRecord); //[cite: 16]

router.route("/:id")
    .get(getRecordById)
    .put(updateRecord)
    .delete(deleteRecord); //[cite: 16]

module.exports = router; //[cite: 16]