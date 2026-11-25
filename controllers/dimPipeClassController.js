// const DimPipeClassModel = require("../models/dimPipeClassModel");

// exports.getAllPipeClasses = async (req, res) => {
//     try {
//         const records = await DimPipeClassModel.getAll();
//         res.status(200).json({ success: true, count: records.length, data: records });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.getPipeClassById = async (req, res) => {
//     try {
//         const record = await DimPipeClassModel.getById(req.params.id);
//         if (!record) {
//             return res.status(404).json({ success: false, error: "Pipe class not found" });
//         }
//         res.status(200).json({ success: true, data: record });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.createPipeClass = async (req, res) => {
//     try {
//         const newRecord = await DimPipeClassModel.create(req.body);
//         res.status(201).json({ success: true, data: newRecord });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.updatePipeClass = async (req, res) => {
//     try {
//         const updated = await DimPipeClassModel.update(req.params.id, req.body);
//         if (!updated) {
//             return res.status(404).json({ success: false, error: "Pipe class not found" });
//         }
//         res.status(200).json({ success: true, data: updated });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.deletePipeClass = async (req, res) => {
//     try {
//         const deleted = await DimPipeClassModel.delete(req.params.id);
//         if (!deleted) {
//             return res.status(404).json({ success: false, error: "Pipe class not found" });
//         }
//         res.status(200).json({ success: true, data: deleted });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };