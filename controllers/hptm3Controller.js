// const Hptm3Model = require("../models/hptm3Model");

// exports.getHptm3Report = async (req, res) => {
//     try {
//         const { fromDateTime, toDateTime } = req.query;
//         if (!fromDateTime || !toDateTime) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Both 'fromDateTime' and 'toDateTime' query parameters are required."
//             });
//         }
//         const records = await Hptm3Model.getReportData(fromDateTime, toDateTime);
//         res.status(200).json({ success: true, count: records.length, data: records });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.getHptm3DaySummary = async (req, res) => {
//     try {
//         const { selDate } = req.query;
//         if (!selDate) {
//             return res.status(400).json({
//                 success: false,
//                 error: "The 'selDate' query parameter (YYYY-MM-DD) is required."
//             });
//         }
//         const records = await Hptm3Model.getDaySummaryData(selDate);
//         res.status(200).json({ success: true, count: records.length, data: records });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.getHptm3ShiftSummary = async (req, res) => {
//     try {
//         const { selDate, selShift } = req.query;
//         if (!selDate || !selShift) {
//             return res.status(400).json({
//                 success: false,
//                 error: "Both 'selDate' (YYYY-MM-DD) and 'selShift' (A, B, or C) query parameters are required."
//             });
//         }
//         const records = await Hptm3Model.getShiftSummaryData(selDate, selShift);
//         res.status(200).json({ success: true, count: records.length, data: records });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.getHptm3LastData = async (req, res) => {
//     try {
//         const rows = await Hptm3Model.getLastData();
//         res.status(200).json({ success: true, data: rows });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };


const Hptm3Model = require("../models/hptm3Model");

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

exports.getHptm3Report = async (req, res) => {
    try {
        const { fromDateTime, toDateTime } = req.query;
        if (!fromDateTime || !toDateTime) {
            return res.status(400).json({
                success: false,
                error: "Both 'fromDateTime' and 'toDateTime' query parameters are required."
            });
        }
        const records = await Hptm3Model.getReportData(fromDateTime, toDateTime);
        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getHptm3DaySummary = async (req, res) => {
    try {
        const { selDate } = req.query;
        if (!selDate) {
            return res.status(400).json({
                success: false,
                error: "The 'selDate' query parameter (YYYY-MM-DD) is required."
            });
        }
        if (!DATE_RE.test(String(selDate))) {
            return res.status(400).json({
                success: false,
                error: "'selDate' must be in YYYY-MM-DD format."
            });
        }
        const records = await Hptm3Model.getDaySummaryData(selDate);
        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getHptm3ShiftSummary = async (req, res) => {
    try {
        const { selDate, selShift } = req.query;
        if (!selDate || !selShift) {
            return res.status(400).json({
                success: false,
                error: "Both 'selDate' (YYYY-MM-DD) and 'selShift' (A, B, or C) query parameters are required."
            });
        }
        if (!DATE_RE.test(String(selDate))) {
            return res.status(400).json({
                success: false,
                error: "'selDate' must be in YYYY-MM-DD format."
            });
        }
        const shift = String(selShift).trim().toUpperCase();
        if (!["A", "B", "C"].includes(shift)) {
            return res.status(400).json({
                success: false,
                error: "'selShift' must be A, B or C."
            });
        }
        const records = await Hptm3Model.getShiftSummaryData(selDate, shift);
        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getHptm3LastData = async (req, res) => {
    try {
        const rows = await Hptm3Model.getLastData();
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
