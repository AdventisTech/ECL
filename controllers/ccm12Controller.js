const Ccm12Model = require("../models/ccm12Model");

exports.getAllRecords = async (req, res) => {
    try {
        const records = await Ccm12Model.getAll();
        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getRecordById = async (req, res) => {
    try {
        const record = await Ccm12Model.getById(req.params.id);
        if (!record) {
            return res.status(404).json({ success: false, error: "Record not found" });
        }
        res.status(200).json({ success: true, data: record });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.createRecord = async (req, res) => {
    try {
        const newRecord = await Ccm12Model.create(req.body);
        res.status(201).json({ success: true, data: newRecord });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateRecord = async (req, res) => {
    try {
        const updated = await Ccm12Model.update(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ success: false, error: "Record not found" });
        }
        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.deleteRecord = async (req, res) => {
    try {
        const deleted = await Ccm12Model.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: "Record not found" });
        }
        res.status(200).json({ success: true, data: deleted });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};