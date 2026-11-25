// const MapMachineRecipesModel = require("../models/mapMachineRecipesModel");

// exports.getAllMappings = async (req, res) => {
//     try {
//         const records = await MapMachineRecipesModel.getAll();
//         res.status(200).json({ success: true, count: records.length, data: records });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.getMappingByIds = async (req, res) => {
//     try {
//         const { machineId, recipeId } = req.params;
//         const record = await MapMachineRecipesModel.getByIds(machineId, recipeId);
//         if (!record) {
//             return res.status(404).json({ success: false, error: "Machine-recipe mapping not found" });
//         }
//         res.status(200).json({ success: true, data: record });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.createMapping = async (req, res) => {
//     try {
//         const newRecord = await MapMachineRecipesModel.create(req.body);
//         res.status(201).json({ success: true, data: newRecord });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.updateMapping = async (req, res) => {
//     try {
//         const { machineId, recipeId } = req.params;
//         const updated = await MapMachineRecipesModel.update(machineId, recipeId, req.body);
//         if (!updated) {
//             return res.status(404).json({ success: false, error: "Machine-recipe mapping not found" });
//         }
//         res.status(200).json({ success: true, data: updated });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.deleteMapping = async (req, res) => {
//     try {
//         const { machineId, recipeId } = req.params;
//         const deleted = await MapMachineRecipesModel.delete(machineId, recipeId);
//         if (!deleted) {
//             return res.status(404).json({ success: false, error: "Machine-recipe mapping not found" });
//         }
//         res.status(200).json({ success: true, data: deleted });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };