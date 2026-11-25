// const DimRejectionReasonsModel = require("../models/dimRejectionReasonsModel");

// exports.getAllRejectionReasons = async (req, res) => {
//     try {
//         const records = await DimRejectionReasonsModel.getAll();
//         res.status(200).json({ success: true, count: records.length, data: records });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.getRejectionReasonById = async (req, res) => {
//     try {
//         const record = await DimRejectionReasonsModel.getById(req.params.id);
//         if (!record) {
//             return res.status(404).json({ success: false, error: "Rejection reason not found" });
//         }
//         res.status(200).json({ success: true, data: record });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.createRejectionReason = async (req, res) => {
//     try {
//         const newRecord = await DimRejectionReasonsModel.create(req.body);
//         res.status(201).json({ success: true, data: newRecord });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.updateRejectionReason = async (req, res) => {
//     try {
//         const updated = await DimRejectionReasonsModel.update(req.params.id, req.body);
//         if (!updated) {
//             return res.status(404).json({ success: false, error: "Rejection reason not found" });
//         }
//         res.status(200).json({ success: true, data: updated });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.deleteRejectionReason = async (req, res) => {
//     try {
//         const deleted = await DimRejectionReasonsModel.delete(req.params.id);
//         if (!deleted) {
//             return res.status(404).json({ success: false, error: "Rejection reason not found" });
//         }
//         res.status(200).json({ success: true, data: deleted });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };