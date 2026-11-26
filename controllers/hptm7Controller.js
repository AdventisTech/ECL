// const Hptm7Model = require("../models/hptm7Model");

// exports.getHptm7Report = async (req, res) => {
//     try {
//         const { fromDateTime, toDateTime } = req.query;

//         // Validate required date filters
//         if (!fromDateTime || !toDateTime) {
//             return res.status(400).json({ 
//                 success: false, 
//                 error: "Both 'fromDateTime' and 'toDateTime' query parameters are required." 
//             });
//         }

//         const records = await Hptm7Model.getReportData(fromDateTime, toDateTime);
        
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

const Hptm7Model = require("../models/hptm7Model");

exports.getHptm7Report = async (req, res) => {
    try {
        const { fromDateTime, toDateTime } = req.query;

        // Validate required date filters
        if (!fromDateTime || !toDateTime) {
            return res.status(400).json({ 
                success: false, 
                error: "Both 'fromDateTime' and 'toDateTime' query parameters are required." 
            });
        }

        const records = await Hptm7Model.getReportData(fromDateTime, toDateTime);
        
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
exports.getHptm7LastData = async (req, res) => {
    try {
        const rows = await Hptm7Model.getLastData();
        res.status(200).json({ success: true, data: rows });
    } catch (error) {
        console.error("HPTM7 last-data error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};