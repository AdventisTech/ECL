// const DimEmployeesModel = require("../models/dimEmployeesModel");

// exports.getAllEmployees = async (req, res) => {
//     try {
//         const records = await DimEmployeesModel.getAll();
//         res.status(200).json({ success: true, count: records.length, data: records });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.getEmployeeById = async (req, res) => {
//     try {
//         const record = await DimEmployeesModel.getById(req.params.id);
//         if (!record) {
//             return res.status(404).json({ success: false, error: "Employee not found" });
//         }
//         res.status(200).json({ success: true, data: record });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.createEmployee = async (req, res) => {
//     try {
//         const newRecord = await DimEmployeesModel.create(req.body);
//         res.status(201).json({ success: true, data: newRecord });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.updateEmployee = async (req, res) => {
//     try {
//         const updated = await DimEmployeesModel.update(req.params.id, req.body);
//         if (!updated) {
//             return res.status(404).json({ success: false, error: "Employee not found" });
//         }
//         res.status(200).json({ success: true, data: updated });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.deleteEmployee = async (req, res) => {
//     try {
//         const deleted = await DimEmployeesModel.delete(req.params.id);
//         if (!deleted) {
//             return res.status(404).json({ success: false, error: "Employee not found" });
//         }
//         res.status(200).json({ success: true, data: deleted });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };