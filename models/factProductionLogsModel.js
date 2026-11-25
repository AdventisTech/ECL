// // // const { getHptmPool, sql } = require("../config/sqlDb"); //[cite: 1]

// // // class FactProductionLogsModel {
// // //     // Get all production logs with all foreign keys mapped via joins
// // //     static async getAll() {
// // //         const pool = await getHptmPool(); //[cite: 1]
// // //         const result = await pool.request().query(`
// // //             SELECT 
// // //                 f.[LogID],
// // //                 f.[MachineID],
// // //                 m.[MachineCode],
// // //                 m.[MachineName],
// // //                 m.[Department] AS MachineDepartment,
// // //                 f.[RecipeID],
// // //                 r.[RecipeCode],
// // //                 r.[RecipeName],
// // //                 r.[PipeClass] AS PipeClassID,
// // //                 pc.[PipeClassName],
// // //                 f.[CompletionTime],
// // //                 f.[BatchNumber],
// // //                 f.[SetPressure],
// // //                 f.[ActPressure],
// // //                 f.[HoldTime],
// // //                 f.[PassCount],
// // //                 f.[GoodCount],
// // //                 f.[ScrapCount],
// // //                 f.[ReworkCount],
// // //                 f.[ScrapReason],
// // //                 f.[Mode],
// // //                 f.[OperatorID],
// // //                 op.[EmpName] AS OperatorName,
// // //                 f.[InchargeID],
// // //                 inc.[EmpName] AS InchargeName,
// // //                 f.[TestResult]
// // //             FROM [HPTM].[dbo].[Fact_ProductionLogs] f
// // //             LEFT JOIN [HPTM].[dbo].[Dim_Machines] m ON f.[MachineID] = m.[MachineID]
// // //             LEFT JOIN [HPTM].[dbo].[Dim_Recipes] r ON f.[RecipeID] = r.[RecipeID]
// // //             LEFT JOIN [HPTM].[dbo].[Dim_PipeClass] pc ON r.[PipeClass] = pc.[PipeClassID]
// // //             LEFT JOIN [HPTM].[dbo].[Dim_Employees] op ON f.[OperatorID] = op.[EmpID]
// // //             LEFT JOIN [HPTM].[dbo].[Dim_Employees] inc ON f.[InchargeID] = inc.[EmpID]
// // //         `);
// // //         return result.recordset;
// // //     }

// // //     // Get production log by ID with mappings
// // //     static async getById(id) {
// // //         const pool = await getHptmPool(); //[cite: 1]
// // //         const result = await pool.request()
// // //             .input("LogID", sql.Int, id)
// // //             .query(`
// // //                 SELECT 
// // //                     f.[LogID],
// // //                     f.[MachineID],
// // //                     m.[MachineCode],
// // //                     m.[MachineName],
// // //                     m.[Department] AS MachineDepartment,
// // //                     f.[RecipeID],
// // //                     r.[RecipeCode],
// // //                     r.[RecipeName],
// // //                     r.[PipeClass] AS PipeClassID,
// // //                     pc.[PipeClassName],
// // //                     f.[CompletionTime],
// // //                     f.[BatchNumber],
// // //                     f.[SetPressure],
// // //                     f.[ActPressure],
// // //                     f.[HoldTime],
// // //                     f.[PassCount],
// // //                     f.[GoodCount],
// // //                     f.[ScrapCount],
// // //                     f.[ReworkCount],
// // //                     f.[ScrapReason],
// // //                     f.[Mode],
// // //                     f.[OperatorID],
// // //                     op.[EmpName] AS OperatorName,
// // //                     f.[InchargeID],
// // //                     inc.[EmpName] AS InchargeName,
// // //                     f.[TestResult]
// // //                 FROM [HPTM].[dbo].[Fact_ProductionLogs] f
// // //                 LEFT JOIN [HPTM].[dbo].[Dim_Machines] m ON f.[MachineID] = m.[MachineID]
// // //                 LEFT JOIN [HPTM].[dbo].[Dim_Recipes] r ON f.[RecipeID] = r.[RecipeID]
// // //                 LEFT JOIN [HPTM].[dbo].[Dim_PipeClass] pc ON r.[PipeClass] = pc.[PipeClassID]
// // //                 LEFT JOIN [HPTM].[dbo].[Dim_Employees] op ON f.[OperatorID] = op.[EmpID]
// // //                 LEFT JOIN [HPTM].[dbo].[Dim_Employees] inc ON f.[InchargeID] = inc.[EmpID]
// // //                 WHERE f.[LogID] = @LogID
// // //             `);
// // //         return result.recordset[0];
// // //     }

// // //     // Create a new production log
// // //     static async create(data) {
// // //         const pool = await getHptmPool(); //[cite: 1]
// // //         const result = await pool.request()
// // //             .input("MachineID", sql.Int, data.MachineID)
// // //             .input("RecipeID", sql.Int, data.RecipeID)
// // //             .input("CompletionTime", sql.DateTime, data.CompletionTime || new Date())
// // //             .input("BatchNumber", sql.VarChar, data.BatchNumber)
// // //             .input("SetPressure", sql.Decimal(18, 2), data.SetPressure)
// // //             .input("ActPressure", sql.Decimal(18, 2), data.ActPressure)
// // //             .input("HoldTime", sql.Decimal(18, 2), data.HoldTime)
// // //             .input("PassCount", sql.Int, data.PassCount)
// // //             .input("GoodCount", sql.Int, data.GoodCount)
// // //             .input("ScrapCount", sql.Int, data.ScrapCount)
// // //             .input("ReworkCount", sql.Int, data.ReworkCount)
// // //             .input("ScrapReason", sql.VarChar, data.ScrapReason)
// // //             .input("Mode", sql.VarChar, data.Mode)
// // //             .input("OperatorID", sql.Int, data.OperatorID)
// // //             .input("InchargeID", sql.Int, data.InchargeID)
// // //             .input("TestResult", sql.VarChar, data.TestResult)
// // //             .query(`
// // //                 INSERT INTO Fact_ProductionLogs (
// // //                     MachineID, RecipeID, CompletionTime, BatchNumber, SetPressure, 
// // //                     ActPressure, HoldTime, PassCount, GoodCount, ScrapCount, 
// // //                     ReworkCount, ScrapReason, Mode, OperatorID, InchargeID, TestResult
// // //                 )
// // //                 OUTPUT INSERTED.*
// // //                 VALUES (
// // //                     @MachineID, @RecipeID, @CompletionTime, @BatchNumber, @SetPressure, 
// // //                     @ActPressure, @HoldTime, @PassCount, @GoodCount, @ScrapCount, 
// // //                     @ReworkCount, @ScrapReason, @Mode, @OperatorID, @InchargeID, @TestResult
// // //                 )
// // //             `);
// // //         return result.recordset[0];
// // //     }

// // //     // Update a production log
// // //     static async update(id, data) {
// // //         const pool = await getHptmPool(); //[cite: 1]
// // //         const result = await pool.request()
// // //             .input("LogID", sql.Int, id)
// // //             .input("MachineID", sql.Int, data.MachineID)
// // //             .input("RecipeID", sql.Int, data.RecipeID)
// // //             .input("CompletionTime", sql.DateTime, data.CompletionTime)
// // //             .input("BatchNumber", sql.VarChar, data.BatchNumber)
// // //             .input("SetPressure", sql.Decimal(18, 2), data.SetPressure)
// // //             .input("ActPressure", sql.Decimal(18, 2), data.ActPressure)
// // //             .input("HoldTime", sql.Decimal(18, 2), data.HoldTime)
// // //             .input("PassCount", sql.Int, data.PassCount)
// // //             .input("GoodCount", sql.Int, data.GoodCount)
// // //             .input("ScrapCount", sql.Int, data.ScrapCount)
// // //             .input("ReworkCount", sql.Int, data.ReworkCount)
// // //             .input("ScrapReason", sql.VarChar, data.ScrapReason)
// // //             .input("Mode", sql.VarChar, data.Mode)
// // //             .input("OperatorID", sql.Int, data.OperatorID)
// // //             .input("InchargeID", sql.Int, data.InchargeID)
// // //             .input("TestResult", sql.VarChar, data.TestResult)
// // //             .query(`
// // //                 UPDATE Fact_ProductionLogs 
// // //                 SET MachineID = @MachineID, 
// // //                     RecipeID = @RecipeID, 
// // //                     CompletionTime = @CompletionTime, 
// // //                     BatchNumber = @BatchNumber, 
// // //                     SetPressure = @SetPressure, 
// // //                     ActPressure = @ActPressure, 
// // //                     HoldTime = @HoldTime, 
// // //                     PassCount = @PassCount, 
// // //                     GoodCount = @GoodCount, 
// // //                     ScrapCount = @ScrapCount, 
// // //                     ReworkCount = @ReworkCount, 
// // //                     ScrapReason = @ScrapReason, 
// // //                     Mode = @Mode, 
// // //                     OperatorID = @OperatorID, 
// // //                     InchargeID = @InchargeID, 
// // //                     TestResult = @TestResult
// // //                 OUTPUT INSERTED.*
// // //                 WHERE LogID = @LogID
// // //             `);
// // //         return result.recordset[0];
// // //     }

// // //     // Delete a production log
// // //     static async delete(id) {
// // //         const pool = await getHptmPool(); //[cite: 1]
// // //         const result = await pool.request()
// // //             .input("LogID", sql.Int, id)
// // //             .query(`
// // //                 DELETE FROM Fact_ProductionLogs 
// // //                 OUTPUT DELETED.*
// // //                 WHERE LogID = @LogID
// // //             `);
// // //         return result.recordset[0];
// // //     }
// // // }

// // // module.exports = FactProductionLogsModel;


// // const { getHptmPool, sql } = require("../config/sqlDb");

// // class FactProductionLogsModel {
// //     // Get all production logs with all foreign keys and map table joined
// //     static async getAll() {
// //         const pool = await getHptmPool();
// //         const result = await pool.request().query(`
// //             SELECT 
// //                 f.[LogID],
// //                 f.[MachineID],
// //                 m.[MachineCode],
// //                 m.[MachineName],
// //                 m.[Department] AS MachineDepartment,
// //                 f.[RecipeID],
// //                 r.[RecipeCode],
// //                 r.[RecipeName],
// //                 r.[PipeClass] AS PipeClassID,
// //                 pc.[PipeClassName],
// //                 mr.[IdealCycleTimeSecs],
// //                 f.[CompletionTime],
// //                 f.[BatchNumber],
// //                 f.[SetPressure],
// //                 f.[ActPressure],
// //                 f.[HoldTime],
// //                 f.[PassCount],
// //                 f.[GoodCount],
// //                 f.[ScrapCount],
// //                 f.[ReworkCount],
// //                 f.[ScrapReason],
// //                 f.[Mode],
// //                 f.[OperatorID],
// //                 op.[EmpName] AS OperatorName,
// //                 f.[InchargeID],
// //                 inc.[EmpName] AS InchargeName,
// //                 f.[TestResult]
// //             FROM [HPTM].[dbo].[Fact_ProductionLogs] f
// //             LEFT JOIN [HPTM].[dbo].[Dim_Machines] m ON f.[MachineID] = m.[MachineID]
// //             LEFT JOIN [HPTM].[dbo].[Dim_Recipes] r ON f.[RecipeID] = r.[RecipeID]
// //             LEFT JOIN [HPTM].[dbo].[Dim_PipeClass] pc ON r.[PipeClass] = pc.[PipeClassID]
// //             LEFT JOIN [HPTM].[dbo].[Map_MachineRecipes] mr ON f.[MachineID] = mr.[MachineID] AND f.[RecipeID] = mr.[RecipeID]
// //             LEFT JOIN [HPTM].[dbo].[Dim_Employees] op ON f.[OperatorID] = op.[EmpID]
// //             LEFT JOIN [HPTM].[dbo].[Dim_Employees] inc ON f.[InchargeID] = inc.[EmpID]
// //         `);
// //         return result.recordset;
// //     }

// //     // Get production log by ID with mappings
// //     static async getById(id) {
// //         const pool = await getHptmPool();
// //         const result = await pool.request()
// //             .input("LogID", sql.Int, id)
// //             .query(`
// //                 SELECT 
// //                     f.[LogID],
// //                     f.[MachineID],
// //                     m.[MachineCode],
// //                     m.[MachineName],
// //                     m.[Department] AS MachineDepartment,
// //                     f.[RecipeID],
// //                     r.[RecipeCode],
// //                     r.[RecipeName],
// //                     r.[PipeClass] AS PipeClassID,
// //                     pc.[PipeClassName],
// //                     mr.[IdealCycleTimeSecs],
// //                     f.[CompletionTime],
// //                     f.[BatchNumber],
// //                     f.[SetPressure],
// //                     f.[ActPressure],
// //                     f.[HoldTime],
// //                     f.[PassCount],
// //                     f.[GoodCount],
// //                     f.[ScrapCount],
// //                     f.[ReworkCount],
// //                     f.[ScrapReason],
// //                     f.[Mode],
// //                     f.[OperatorID],
// //                     op.[EmpName] AS OperatorName,
// //                     f.[InchargeID],
// //                     inc.[EmpName] AS InchargeName,
// //                     f.[TestResult]
// //                 FROM [HPTM].[dbo].[Fact_ProductionLogs] f
// //                 LEFT JOIN [HPTM].[dbo].[Dim_Machines] m ON f.[MachineID] = m.[MachineID]
// //                 LEFT JOIN [HPTM].[dbo].[Dim_Recipes] r ON f.[RecipeID] = r.[RecipeID]
// //                 LEFT JOIN [HPTM].[dbo].[Dim_PipeClass] pc ON r.[PipeClass] = pc.[PipeClassID]
// //                 LEFT JOIN [HPTM].[dbo].[Map_MachineRecipes] mr ON f.[MachineID] = mr.[MachineID] AND f.[RecipeID] = mr.[RecipeID]
// //                 LEFT JOIN [HPTM].[dbo].[Dim_Employees] op ON f.[OperatorID] = op.[EmpID]
// //                 LEFT JOIN [HPTM].[dbo].[Dim_Employees] inc ON f.[InchargeID] = inc.[EmpID]
// //                 WHERE f.[LogID] = @LogID
// //             `);
// //         return result.recordset[0];
// //     }

// //     // Create a new production log
// //     static async create(data) {
// //         const pool = await getHptmPool();
// //         const result = await pool.request()
// //             .input("MachineID", sql.Int, data.MachineID)
// //             .input("RecipeID", sql.Int, data.RecipeID)
// //             .input("CompletionTime", sql.DateTime, data.CompletionTime || new Date())
// //             .input("BatchNumber", sql.VarChar, data.BatchNumber)
// //             .input("SetPressure", sql.Decimal(18, 2), data.SetPressure)
// //             .input("ActPressure", sql.Decimal(18, 2), data.ActPressure)
// //             .input("HoldTime", sql.Decimal(18, 2), data.HoldTime)
// //             .input("PassCount", sql.Int, data.PassCount)
// //             .input("GoodCount", sql.Int, data.GoodCount)
// //             .input("ScrapCount", sql.Int, data.ScrapCount)
// //             .input("ReworkCount", sql.Int, data.ReworkCount)
// //             .input("ScrapReason", sql.VarChar, data.ScrapReason)
// //             .input("Mode", sql.VarChar, data.Mode)
// //             .input("OperatorID", sql.Int, data.OperatorID)
// //             .input("InchargeID", sql.Int, data.InchargeID)
// //             .input("TestResult", sql.VarChar, data.TestResult)
// //             .query(`
// //                 INSERT INTO Fact_ProductionLogs (
// //                     MachineID, RecipeID, CompletionTime, BatchNumber, SetPressure, 
// //                     ActPressure, HoldTime, PassCount, GoodCount, ScrapCount, 
// //                     ReworkCount, ScrapReason, Mode, OperatorID, InchargeID, TestResult
// //                 )
// //                 OUTPUT INSERTED.*
// //                 VALUES (
// //                     @MachineID, @RecipeID, @CompletionTime, @BatchNumber, @SetPressure, 
// //                     @ActPressure, @HoldTime, @PassCount, @GoodCount, @ScrapCount, 
// //                     @ReworkCount, @ScrapReason, @Mode, @OperatorID, @InchargeID, @TestResult
// //                 )
// //             `);
// //         return result.recordset[0];
// //     }

// //     // Update a production log
// //     static async update(id, data) {
// //         const pool = await getHptmPool();
// //         const result = await pool.request()
// //             .input("LogID", sql.Int, id)
// //             .input("MachineID", sql.Int, data.MachineID)
// //             .input("RecipeID", sql.Int, data.RecipeID)
// //             .input("CompletionTime", sql.DateTime, data.CompletionTime)
// //             .input("BatchNumber", sql.VarChar, data.BatchNumber)
// //             .input("SetPressure", sql.Decimal(18, 2), data.SetPressure)
// //             .input("ActPressure", sql.Decimal(18, 2), data.ActPressure)
// //             .input("HoldTime", sql.Decimal(18, 2), data.HoldTime)
// //             .input("PassCount", sql.Int, data.PassCount)
// //             .input("GoodCount", sql.Int, data.GoodCount)
// //             .input("ScrapCount", sql.Int, data.ScrapCount)
// //             .input("ReworkCount", sql.Int, data.ReworkCount)
// //             .input("ScrapReason", sql.VarChar, data.ScrapReason)
// //             .input("Mode", sql.VarChar, data.Mode)
// //             .input("OperatorID", sql.Int, data.OperatorID)
// //             .input("InchargeID", sql.Int, data.InchargeID)
// //             .input("TestResult", sql.VarChar, data.TestResult)
// //             .query(`
// //                 UPDATE Fact_ProductionLogs 
// //                 SET MachineID = @MachineID, 
// //                     RecipeID = @RecipeID, 
// //                     CompletionTime = @CompletionTime, 
// //                     BatchNumber = @BatchNumber, 
// //                     SetPressure = @SetPressure, 
// //                     ActPressure = @ActPressure, 
// //                     HoldTime = @HoldTime, 
// //                     PassCount = @PassCount, 
// //                     GoodCount = @GoodCount, 
// //                     ScrapCount = @ScrapCount, 
// //                     ReworkCount = @ReworkCount, 
// //                     ScrapReason = @ScrapReason, 
// //                     Mode = @Mode, 
// //                     OperatorID = @OperatorID, 
// //                     InchargeID = @InchargeID, 
// //                     TestResult = @TestResult
// //                 OUTPUT INSERTED.*
// //                 WHERE LogID = @LogID
// //             `);
// //         return result.recordset[0];
// //     }

// //     // Delete a production log
// //     static async delete(id) {
// //         const pool = await getHptmPool();
// //         const result = await pool.request()
// //             .input("LogID", sql.Int, id)
// //             .query(`
// //                 DELETE FROM Fact_ProductionLogs 
// //                 OUTPUT DELETED.*
// //                 WHERE LogID = @LogID
// //             `);
// //         return result.recordset[0];
// //     }
// // }

// // module.exports = FactProductionLogsModel;


// const { getHptmPool, sql } = require("../config/sqlDb");

// class FactProductionLogsModel {
//     // Get all production logs with all fields and fully mapped joins
//     static async getAll() {
//         const pool = await getHptmPool();
//         const result = await pool.request().query(`
//             SELECT 
//                 f.[LogID],
//                 f.[MachineID],
//                 m.[MachineCode],
//                 m.[MachineName],
//                 m.[Department] AS MachineDepartment,
//                 m.[IsActive] AS MachineIsActive,
//                 f.[RecipeID],
//                 r.[RecipeCode],
//                 r.[RecipeName],
//                 r.[Description] AS RecipeDescription,
//                 r.[PipeDiameterMM],
//                 r.[PipeLengthMeters],
//                 r.[PipeClass] AS PipeClassID,
//                 pc.[PipeClassName],
//                 mr.[IdealCycleTimeSecs],
//                 f.[CompletionTime],
//                 f.[BatchNumber],
//                 f.[SetPressure],
//                 f.[ActPressure],
//                 f.[HoldTime],
//                 f.[PassCount],
//                 f.[GoodCount],
//                 f.[ScrapCount],
//                 f.[ReworkCount],
//                 f.[ScrapReason],
//                 f.[Mode],
//                 f.[OperatorID],
//                 op.[EmpName] AS OperatorName,
//                 f.[InchargeID],
//                 inc.[EmpName] AS InchargeName,
//                 f.[TestResult]
//             FROM [HPTM].[dbo].[Fact_ProductionLogs] f
//             LEFT JOIN [HPTM].[dbo].[Dim_Machines] m ON f.[MachineID] = m.[MachineID]
//             LEFT JOIN [HPTM].[dbo].[Dim_Recipes] r ON f.[RecipeID] = r.[RecipeID]
//             LEFT JOIN [HPTM].[dbo].[Dim_PipeClass] pc ON r.[PipeClass] = pc.[PipeClassID]
//             LEFT JOIN [HPTM].[dbo].[Map_MachineRecipes] mr ON f.[MachineID] = mr.[MachineID] AND f.[RecipeID] = mr.[RecipeID]
//             LEFT JOIN [HPTM].[dbo].[Dim_Employees] op ON f.[OperatorID] = op.[EmpID]
//             LEFT JOIN [HPTM].[dbo].[Dim_Employees] inc ON f.[InchargeID] = inc.[EmpID]
//         `);
//         return result.recordset;
//     }

//     // Get production log by ID with all fields and mappings
//     static async getById(id) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("LogID", sql.Int, id)
//             .query(`
//                 SELECT 
//                     f.[LogID],
//                     f.[MachineID],
//                     m.[MachineCode],
//                     m.[MachineName],
//                     m.[Department] AS MachineDepartment,
//                     m.[IsActive] AS MachineIsActive,
//                     f.[RecipeID],
//                     r.[RecipeCode],
//                     r.[RecipeName],
//                     r.[Description] AS RecipeDescription,
//                     r.[PipeDiameterMM],
//                     r.[PipeLengthMeters],
//                     r.[PipeClass] AS PipeClassID,
//                     pc.[PipeClassName],
//                     mr.[IdealCycleTimeSecs],
//                     f.[CompletionTime],
//                     f.[BatchNumber],
//                     f.[SetPressure],
//                     f.[ActPressure],
//                     f.[HoldTime],
//                     f.[PassCount],
//                     f.[GoodCount],
//                     f.[ScrapCount],
//                     f.[ReworkCount],
//                     f.[ScrapReason],
//                     f.[Mode],
//                     f.[OperatorID],
//                     op.[EmpName] AS OperatorName,
//                     f.[InchargeID],
//                     inc.[EmpName] AS InchargeName,
//                     f.[TestResult]
//                 FROM [HPTM].[dbo].[Fact_ProductionLogs] f
//                 LEFT JOIN [HPTM].[dbo].[Dim_Machines] m ON f.[MachineID] = m.[MachineID]
//                 LEFT JOIN [HPTM].[dbo].[Dim_Recipes] r ON f.[RecipeID] = r.[RecipeID]
//                 LEFT JOIN [HPTM].[dbo].[Dim_PipeClass] pc ON r.[PipeClass] = pc.[PipeClassID]
//                 LEFT JOIN [HPTM].[dbo].[Map_MachineRecipes] mr ON f.[MachineID] = mr.[MachineID] AND f.[RecipeID] = mr.[RecipeID]
//                 LEFT JOIN [HPTM].[dbo].[Dim_Employees] op ON f.[OperatorID] = op.[EmpID]
//                 LEFT JOIN [HPTM].[dbo].[Dim_Employees] inc ON f.[InchargeID] = inc.[EmpID]
//                 WHERE f.[LogID] = @LogID
//             `);
//         return result.recordset[0];
//     }

//     // Create a new production log
//     static async create(data) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("MachineID", sql.Int, data.MachineID)
//             .input("RecipeID", sql.Int, data.RecipeID)
//             .input("CompletionTime", sql.DateTime, data.CompletionTime || new Date())
//             .input("BatchNumber", sql.VarChar, data.BatchNumber)
//             .input("SetPressure", sql.Decimal(18, 2), data.SetPressure)
//             .input("ActPressure", sql.Decimal(18, 2), data.ActPressure)
//             .input("HoldTime", sql.Decimal(18, 2), data.HoldTime)
//             .input("PassCount", sql.Int, data.PassCount)
//             .input("GoodCount", sql.Int, data.GoodCount)
//             .input("ScrapCount", sql.Int, data.ScrapCount)
//             .input("ReworkCount", sql.Int, data.ReworkCount)
//             .input("ScrapReason", sql.VarChar, data.ScrapReason)
//             .input("Mode", sql.VarChar, data.Mode)
//             .input("OperatorID", sql.Int, data.OperatorID)
//             .input("InchargeID", sql.Int, data.InchargeID)
//             .input("TestResult", sql.VarChar, data.TestResult)
//             .query(`
//                 INSERT INTO Fact_ProductionLogs (
//                     MachineID, RecipeID, CompletionTime, BatchNumber, SetPressure, 
//                     ActPressure, HoldTime, PassCount, GoodCount, ScrapCount, 
//                     ReworkCount, ScrapReason, Mode, OperatorID, InchargeID, TestResult
//                 )
//                 OUTPUT INSERTED.*
//                 VALUES (
//                     @MachineID, @RecipeID, @CompletionTime, @BatchNumber, @SetPressure, 
//                     @ActPressure, @HoldTime, @PassCount, @GoodCount, @ScrapCount, 
//                     @ReworkCount, @ScrapReason, @Mode, @OperatorID, @InchargeID, @TestResult
//                 )
//             `);
//         return result.recordset[0];
//     }

//     // Update a production log
//     static async update(id, data) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("LogID", sql.Int, id)
//             .input("MachineID", sql.Int, data.MachineID)
//             .input("RecipeID", sql.Int, data.RecipeID)
//             .input("CompletionTime", sql.DateTime, data.CompletionTime)
//             .input("BatchNumber", sql.VarChar, data.BatchNumber)
//             .input("SetPressure", sql.Decimal(18, 2), data.SetPressure)
//             .input("ActPressure", sql.Decimal(18, 2), data.ActPressure)
//             .input("HoldTime", sql.Decimal(18, 2), data.HoldTime)
//             .input("PassCount", sql.Int, data.PassCount)
//             .input("GoodCount", sql.Int, data.GoodCount)
//             .input("ScrapCount", sql.Int, data.ScrapCount)
//             .input("ReworkCount", sql.Int, data.ReworkCount)
//             .input("ScrapReason", sql.VarChar, data.ScrapReason)
//             .input("Mode", sql.VarChar, data.Mode)
//             .input("OperatorID", sql.Int, data.OperatorID)
//             .input("InchargeID", sql.Int, data.InchargeID)
//             .input("TestResult", sql.VarChar, data.TestResult)
//             .query(`
//                 UPDATE Fact_ProductionLogs 
//                 SET MachineID = @MachineID, 
//                     RecipeID = @RecipeID, 
//                     CompletionTime = @CompletionTime, 
//                     BatchNumber = @BatchNumber, 
//                     SetPressure = @SetPressure, 
//                     ActPressure = @ActPressure, 
//                     HoldTime = @HoldTime, 
//                     PassCount = @PassCount, 
//                     GoodCount = @GoodCount, 
//                     ScrapCount = @ScrapCount, 
//                     ReworkCount = @ReworkCount, 
//                     ScrapReason = @ScrapReason, 
//                     Mode = @Mode, 
//                     OperatorID = @OperatorID, 
//                     InchargeID = @InchargeID, 
//                     TestResult = @TestResult
//                 OUTPUT INSERTED.*
//                 WHERE LogID = @LogID
//             `);
//         return result.recordset[0];
//     }

//     // Delete a production log
//     static async delete(id) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("LogID", sql.Int, id)
//             .query(`
//                 DELETE FROM Fact_ProductionLogs 
//                 OUTPUT DELETED.*
//                 WHERE LogID = @LogID
//             `);
//         return result.recordset[0];
//     }
// }

// module.exports = FactProductionLogsModel;