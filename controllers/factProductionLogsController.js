// // const FactProductionLogsModel = require("../models/factProductionLogsModel");

// // exports.getAllLogs = async (req, res) => {
// //     try {
// //         const records = await FactProductionLogsModel.getAll();
// //         res.status(200).json({ success: true, count: records.length, data: records });
// //     } catch (error) {
// //         res.status(500).json({ success: false, error: error.message });
// //     }
// // };

// // exports.getLogById = async (req, res) => {
// //     try {
// //         const record = await FactProductionLogsModel.getById(req.params.id);
// //         if (!record) {
// //             return res.status(404).json({ success: false, error: "Production log not found" });
// //         }
// //         res.status(200).json({ success: true, data: record });
// //     } catch (error) {
// //         res.status(500).json({ success: false, error: error.message });
// //     }
// // };

// // exports.createLog = async (req, res) => {
// //     try {
// //         const newRecord = await FactProductionLogsModel.create(req.body);
// //         res.status(201).json({ success: true, data: newRecord });
// //     } catch (error) {
// //         res.status(500).json({ success: false, error: error.message });
// //     }
// // };

// // exports.updateLog = async (req, res) => {
// //     try {
// //         const updated = await FactProductionLogsModel.update(req.params.id, req.body);
// //         if (!updated) {
// //             return res.status(404).json({ success: false, error: "Production log not found" });
// //         }
// //         res.status(200).json({ success: true, data: updated });
// //     } catch (error) {
// //         res.status(500).json({ success: false, error: error.message });
// //     }
// // };

// // exports.deleteLog = async (req, res) => {
// //     try {
// //         const deleted = await FactProductionLogsModel.delete(req.params.id);
// //         if (!deleted) {
// //             return res.status(404).json({ success: false, error: "Production log not found" });
// //         }
// //         res.status(200).json({ success: true, data: deleted });
// //     } catch (error) {
// //         res.status(500).json({ success: false, error: error.message });
// //     }
// // };

// const FactProductionLogsModel = require("../models/factProductionLogsModel");

// exports.getAllLogs = async (req, res) => {
//     try {
//         const records = await FactProductionLogsModel.getAll();
//         res.status(200).json({ success: true, count: records.length, data: records });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.getLogById = async (req, res) => {
//     try {
//         const record = await FactProductionLogsModel.getById(req.params.id);
//         if (!record) {
//             return res.status(404).json({ success: false, error: "Production log not found" });
//         }
//         res.status(200).json({ success: true, data: record });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.createLog = async (req, res) => {
//     try {
//         const newRecord = await FactProductionLogsModel.create(req.body);
//         res.status(201).json({ success: true, data: newRecord });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.updateLog = async (req, res) => {
//     try {
//         const updated = await FactProductionLogsModel.update(req.params.id, req.body);
//         if (!updated) {
//             return res.status(404).json({ success: false, error: "Production log not found" });
//         }
//         res.status(200).json({ success: true, data: updated });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.deleteLog = async (req, res) => {
//     try {
//         const deleted = await FactProductionLogsModel.delete(req.params.id);
//         if (!deleted) {
//             return res.status(404).json({ success: false, error: "Production log not found" });
//         }
//         res.status(200).json({ success: true, data: deleted });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };