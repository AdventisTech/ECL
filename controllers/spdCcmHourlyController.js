// const CmmHourly = require("../models/sdpCmmHourlyModel");

// exports.getHourlyProduction = async (req, res) => {
//     try {
//         // Accept optional expected target from query params (defaults to 18 if not supplied)
//         const expectedTarget = req.query.expectedTarget ? Number(req.query.expectedTarget) : 18;
        
//         // Compute and store/refresh hourly aggregation
//         const hourlyData = await CmmHourly.calculateAndStoreHourlyProduction(expectedTarget);
        
//         res.status(200).json({ 
//             success: true, 
//             count: hourlyData.length, 
//             data: hourlyData 
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };