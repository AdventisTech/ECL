const Hptm6Model = require("../models/hptm6Model");

exports.getHptm6Report = async (req, res) => {
    try {
        const { fromDateTime, toDateTime } = req.query;
        if (!fromDateTime || !toDateTime) {
            return res.status(400).json({
                success: false,
                error: "Both 'fromDateTime' and 'toDateTime' query parameters are required."
            });
        }
        const records = await Hptm6Model.getReportData(fromDateTime, toDateTime);
        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getHptm6DaySummary = async (req, res) => {
    try {
        const { selDate } = req.query;
        if (!selDate) {
            return res.status(400).json({
                success: false,
                error: "The 'selDate' query parameter (YYYY-MM-DD) is required."
            });
        }
        const records = await Hptm6Model.getDaySummaryData(selDate);
        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getHptm6ShiftSummary = async (req, res) => {
    try {
        const { selDate, selShift } = req.query;
        if (!selDate || !selShift) {
            return res.status(400).json({
                success: false,
                error: "Both 'selDate' (YYYY-MM-DD) and 'selShift' (A, B, or C) query parameters are required."
            });
        }
        const records = await Hptm6Model.getShiftSummaryData(selDate, selShift);
        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getHptm6LastData = async (req, res) => {
    try {
        const rows = await Hptm6Model.getLastData();
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};