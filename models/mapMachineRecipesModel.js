// const { getHptmPool, sql } = require("../config/sqlDb"); // Adjust path to sqlDb.js as needed[cite: 1]

// class MapMachineRecipesModel {
//     // Get all machine-recipe mappings with joined names/codes
//     static async getAll() {
//         const pool = await getHptmPool();
//         const result = await pool.request().query(`
//             SELECT 
//                 mr.[MachineID],
//                 m.[MachineCode],
//                 m.[MachineName],
//                 mr.[RecipeID],
//                 r.[RecipeCode],
//                 r.[RecipeName],
//                 mr.[IdealCycleTimeSecs]
//             FROM [HPTM].[dbo].[Map_MachineRecipes] mr
//             LEFT JOIN [HPTM].[dbo].[Dim_Machines] m ON mr.[MachineID] = m.[MachineID]
//             LEFT JOIN [HPTM].[dbo].[Dim_Recipes] r ON mr.[RecipeID] = r.[RecipeID]
//         `);
//         return result.recordset;
//     }

//     // Get specific machine-recipe mapping by compound primary key (MachineID & RecipeID)
//     static async getByIds(machineId, recipeId) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("MachineID", sql.Int, machineId)
//             .input("RecipeID", sql.Int, recipeId)
//             .query(`
//                 SELECT 
//                     mr.[MachineID],
//                     m.[MachineCode],
//                     m.[MachineName],
//                     mr.[RecipeID],
//                     r.[RecipeCode],
//                     r.[RecipeName],
//                     mr.[IdealCycleTimeSecs]
//                 FROM [HPTM].[dbo].[Map_MachineRecipes] mr
//                 LEFT JOIN [HPTM].[dbo].[Dim_Machines] m ON mr.[MachineID] = m.[MachineID]
//                 LEFT JOIN [HPTM].[dbo].[Dim_Recipes] r ON mr.[RecipeID] = r.[RecipeID]
//                 WHERE mr.[MachineID] = @MachineID AND mr.[RecipeID] = @RecipeID
//             `);
//         return result.recordset[0];
//     }

//     // Create a new machine-recipe mapping
//     static async create(data) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("MachineID", sql.Int, data.MachineID)
//             .input("RecipeID", sql.Int, data.RecipeID)
//             .input("IdealCycleTimeSecs", sql.Decimal(18, 2), data.IdealCycleTimeSecs)
//             .query(`
//                 INSERT INTO Map_MachineRecipes (MachineID, RecipeID, IdealCycleTimeSecs)
//                 OUTPUT INSERTED.*
//                 VALUES (@MachineID, @RecipeID, @IdealCycleTimeSecs)
//             `);
//         return result.recordset[0];
//     }

//     // Update a machine-recipe mapping
//     static async update(machineId, recipeId, data) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("MachineID", sql.Int, machineId)
//             .input("RecipeID", sql.Int, recipeId)
//             .input("IdealCycleTimeSecs", sql.Decimal(18, 2), data.IdealCycleTimeSecs)
//             .query(`
//                 UPDATE Map_MachineRecipes 
//                 SET IdealCycleTimeSecs = @IdealCycleTimeSecs
//                 OUTPUT INSERTED.*
//                 WHERE MachineID = @MachineID AND RecipeID = @RecipeID
//             `);
//         return result.recordset[0];
//     }

//     // Delete a machine-recipe mapping
//     static async delete(machineId, recipeId) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("MachineID", sql.Int, machineId)
//             .input("RecipeID", sql.Int, recipeId)
//             .query(`
//                 DELETE FROM Map_MachineRecipes 
//                 OUTPUT DELETED.*
//                 WHERE MachineID = @MachineID AND RecipeID = @RecipeID
//             `);
//         return result.recordset[0];
//     }
// }

// module.exports = MapMachineRecipesModel;