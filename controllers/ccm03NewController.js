const Ccm03NewModel = require("../models/ccm03NewModel");

exports.getAllRecords = async (req, res) => {
    try {
        const records = await Ccm03NewModel.getAll();
        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getRecordById = async (req, res) => {
    try {
        const record = await Ccm03NewModel.getById(req.params.id);
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
        const newRecord = await Ccm03NewModel.create(req.body);
        res.status(201).json({ success: true, data: newRecord });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.updateRecord = async (req, res) => {
    try {
        const updated = await Ccm03NewModel.update(req.params.id, req.body);
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
        const deleted = await Ccm03NewModel.delete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ success: false, error: "Record not found" });
        }
        res.status(200).json({ success: true, data: deleted });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};