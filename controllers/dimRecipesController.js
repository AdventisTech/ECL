// const DimRecipesModel = require("../models/dimRecipesModel");

// exports.getAllRecipes = async (req, res) => {
//     try {
//         const records = await DimRecipesModel.getAll();
//         res.status(200).json({ success: true, count: records.length, data: records });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.getRecipeById = async (req, res) => {
//     try {
//         const record = await DimRecipesModel.getById(req.params.id);
//         if (!record) {
//             return res.status(404).json({ success: false, error: "Recipe not found" });
//         }
//         res.status(200).json({ success: true, data: record });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.createRecipe = async (req, res) => {
//     try {
//         const newRecord = await DimRecipesModel.create(req.body);
//         res.status(201).json({ success: true, data: newRecord });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.updateRecipe = async (req, res) => {
//     try {
//         const updated = await DimRecipesModel.update(req.params.id, req.body);
//         if (!updated) {
//             return res.status(404).json({ success: false, error: "Recipe not found" });
//         }
//         res.status(200).json({ success: true, data: updated });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };

// exports.deleteRecipe = async (req, res) => {
//     try {
//         const deleted = await DimRecipesModel.delete(req.params.id);
//         if (!deleted) {
//             return res.status(404).json({ success: false, error: "Record not found" });
//         }
//         res.status(200).json({ success: true, data: deleted });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// };