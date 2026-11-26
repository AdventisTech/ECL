// const Hptm5Model = require("../models/hptm5Model");

// exports.getHptm5Report = async (req, res) => {
//     try {
//         const { fromDateTime, toDateTime } = req.query;

//         // Validate required date filters
//         if (!fromDateTime || !toDateTime) {
//             return res.status(400).json({ 
//                 success: false, 
//                 error: "Both 'fromDateTime' and 'toDateTime' query parameters are required." 
//             });
//         }

//         const records = await Hptm5Model.getReportData(fromDateTime, toDateTime);
        
//         res.status(200).json({ 
//             success: true, 
//             count: records.length, 
//             data: records 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false, 
//             error: error.message 
//         });
//     }
// };



// exports.getHptm5DaySummary = async (req, res) => {
//     try {
//         const { selDate } = req.query;

//         if (!selDate) {
//             return res.status(400).json({ 
//                 success: false, 
//                 error: "The 'selDate' query parameter (YYYY-MM-DD) is required." 
//             });
//         }

//         const records = await Hptm5Model.getDaySummaryData(selDate);
        
//         res.status(200).json({ 
//             success: true, 
//             count: records.length, 
//             data: records 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false, 
//             error: error.message 
//         });
//     }
// };


// exports.getHptm5ShiftClassSize = async (req, res) => {
//     try {
//         const { selDate } = req.query;

//         if (!selDate) {
//             return res.status(400).json({ 
//                 success: false, 
//                 error: "The 'selDate' query parameter (YYYY-MM-DD) is required." 
//             });
//         }

//         const records = await Hptm5Model.getShiftClassSizeData(selDate);
        
//         res.status(200).json({ 
//             success: true, 
//             count: records.length, 
//             data: records 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false, 
//             error: error.message 
//         });
//     }
// };

// exports.getHptm5ShiftSummary = async (req, res) => {
//     try {
//         const { selDate, selShift } = req.query;

//         if (!selDate || !selShift) {
//             return res.status(400).json({ 
//                 success: false, 
//                 error: "Both 'selDate' (YYYY-MM-DD) and 'selShift' (A, B, or C) query parameters are required." 
//             });
//         }

//         const records = await Hptm5Model.getShiftSummaryData(selDate, selShift);
        
//         res.status(200).json({ 
//             success: true, 
//             count: records.length, 
//             data: records 
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             success: false, 
//             error: error.message 
//         });
//     }
// };


const Hptm5Model = require("../models/hptm5Model");

exports.getHptm5Report = async (req, res) => {
    try {
        const { fromDateTime, toDateTime } = req.query;

        // Validate required date filters
        if (!fromDateTime || !toDateTime) {
            return res.status(400).json({ 
                success: false, 
                error: "Both 'fromDateTime' and 'toDateTime' query parameters are required." 
            });
        }

        const records = await Hptm5Model.getReportData(fromDateTime, toDateTime);
        
        res.status(200).json({ 
            success: true, 
            count: records.length, 
            data: records 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};



exports.getHptm5DaySummary = async (req, res) => {
    try {
        const { selDate } = req.query;

        if (!selDate) {
            return res.status(400).json({ 
                success: false, 
                error: "The 'selDate' query parameter (YYYY-MM-DD) is required." 
            });
        }

        const records = await Hptm5Model.getDaySummaryData(selDate);
        
        res.status(200).json({ 
            success: true, 
            count: records.length, 
            data: records 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};


exports.getHptm5ShiftClassSize = async (req, res) => {
    try {
        const { selDate } = req.query;

        if (!selDate) {
            return res.status(400).json({ 
                success: false, 
                error: "The 'selDate' query parameter (YYYY-MM-DD) is required." 
            });
        }

        const records = await Hptm5Model.getShiftClassSizeData(selDate);
        
        res.status(200).json({ 
            success: true, 
            count: records.length, 
            data: records 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

exports.getHptm5ShiftSummary = async (req, res) => {
    try {
        const { selDate, selShift } = req.query;

        if (!selDate || !selShift) {
            return res.status(400).json({ 
                success: false, 
                error: "Both 'selDate' (YYYY-MM-DD) and 'selShift' (A, B, or C) query parameters are required." 
            });
        }

        const records = await Hptm5Model.getShiftSummaryData(selDate, selShift);
        
        res.status(200).json({ 
            success: true, 
            count: records.length, 
            data: records 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};
exports.getHptm5LastData = async (req, res) => {
    try {
        const records = await Hptm5Model.getLastData();
        res.status(200).json({ success: true, count: records.length, data: records });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};