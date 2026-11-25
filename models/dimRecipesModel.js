// const { getHptmPool, sql } = require("../config/sqlDb");

// class DimRecipesModel {
//     // Get all recipes with mapped PipeClass details
//     static async getAll() {
//         const pool = await getHptmPool();
//         const result = await pool.request().query(`
//             SELECT 
//                 r.[RecipeID],
//                 r.[PipeDiameterMM],
//                 r.[PipeLengthMeters],
//                 r.[PipeClass] AS PipeClassID,
//                 p.[PipeClassName],
//                 r.[RecipeCode],
//                 r.[RecipeName],
//                 r.[Description]
//             FROM [HPTM].[dbo].[Dim_Recipes] r
//             LEFT JOIN [HPTM].[dbo].[Dim_PipeClass] p ON r.[PipeClass] = p.[PipeClassID]
//         `);
//         return result.recordset;
//     }

//     // Get recipe by ID with mapped PipeClass details
//     static async getById(id) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("RecipeID", sql.Int, id)
//             .query(`
//                 SELECT 
//                     r.[RecipeID],
//                     r.[PipeDiameterMM],
//                     r.[PipeLengthMeters],
//                     r.[PipeClass] AS PipeClassID,
//                     p.[PipeClassName],
//                     r.[RecipeCode],
//                     r.[RecipeName],
//                     r.[Description]
//                 FROM [HPTM].[dbo].[Dim_Recipes] r
//                 LEFT JOIN [HPTM].[dbo].[Dim_PipeClass] p ON r.[PipeClass] = p.[PipeClassID]
//                 WHERE r.[RecipeID] = @RecipeID
//             `);
//         return result.recordset[0];
//     }

//     // Create a new recipe
//     static async create(data) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("PipeDiameterMM", sql.Decimal(18, 2), data.PipeDiameterMM)
//             .input("PipeLengthMeters", sql.Decimal(18, 2), data.PipeLengthMeters)
//             .input("PipeClass", sql.Int, data.PipeClass)
//             .input("RecipeCode", sql.VarChar, data.RecipeCode)
//             .input("RecipeName", sql.VarChar, data.RecipeName)
//             .input("Description", sql.VarChar, data.Description)
//             .query(`
//                 INSERT INTO Dim_Recipes (PipeDiameterMM, PipeLengthMeters, PipeClass, RecipeCode, RecipeName, Description)
//                 OUTPUT INSERTED.*
//                 VALUES (@PipeDiameterMM, @PipeLengthMeters, @PipeClass, @RecipeCode, @RecipeName, @Description)
//             `);
//         return result.recordset[0];
//     }

//     // Update a recipe
//     static async update(id, data) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("RecipeID", sql.Int, id)
//             .input("PipeDiameterMM", sql.Decimal(18, 2), data.PipeDiameterMM)
//             .input("PipeLengthMeters", sql.Decimal(18, 2), data.PipeLengthMeters)
//             .input("PipeClass", sql.Int, data.PipeClass)
//             .input("RecipeCode", sql.VarChar, data.RecipeCode)
//             .input("RecipeName", sql.VarChar, data.RecipeName)
//             .input("Description", sql.VarChar, data.Description)
//             .query(`
//                 UPDATE Dim_Recipes 
//                 SET PipeDiameterMM = @PipeDiameterMM, 
//                     PipeLengthMeters = @PipeLengthMeters, 
//                     PipeClass = @PipeClass, 
//                     RecipeCode = @RecipeCode, 
//                     RecipeName = @RecipeName, 
//                     Description = @Description
//                 OUTPUT INSERTED.*
//                 WHERE RecipeID = @RecipeID
//             `);
//         return result.recordset[0];
//     }

//     // Delete a recipe
//     static async delete(id) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("RecipeID", sql.Int, id)
//             .query(`
//                 DELETE FROM Dim_Recipes 
//                 OUTPUT DELETED.*
//                 WHERE RecipeID = @RecipeID
//             `);
//         return result.recordset[0];
//     }
// }

// module.exports = DimRecipesModel;