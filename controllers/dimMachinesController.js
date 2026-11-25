// const DimMachinesModel = require("../models/dimMachinesModel");

// exports.getAllMachines = async (req, res) => {
//     try {
//         const records = await DimMachinesModel.getAll();
//         res.status(200).json({ success: true, count: records.length, data: records });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.getMachineById = async (req, res) => {
//     try {
//         const record = await DimMachinesModel.getById(req.params.id);
//         if (!record) {
//             return res.status(404).json({ success: false, error: "Machine not found" });
//         }
//         res.status(200).json({ success: true, data: record });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.createMachine = async (req, res) => {
//     try {
//         const newRecord = await DimMachinesModel.create(req.body);
//         res.status(201).json({ success: true, data: newRecord });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.updateMachine = async (req, res) => {
//     try {
//         const updated = await DimMachinesModel.update(req.params.id, req.body);
//         if (!updated) {
//             return res.status(404).json({ success: false, error: "Machine not found" });
//         }
//         res.status(200).json({ success: true, data: updated });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.deleteMachine = async (req, res) => {
//     try {
//         const deleted = await DimMachinesModel.delete(req.params.id);
//         if (!deleted) {
//             return res.status(404).json({ success: false, error: "Machine not found" });
//         }
//         res.status(200).json({ success: true, data: deleted });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };