

// const sql = require("mssql");
// const { getBdpCcmPool } = require("../config/sqlDb");

// const TABLE = "[dbo].[CCM_Hourly_Production]";
// const SOURCE_TABLE = "[dbo].[CCM 04]";

// // Ensure table exists
// async function ensureTableExists(pool) {
//     await pool.request().query(`
//         IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='CCM_Hourly_Production' and xtype='U')
//         CREATE TABLE [dbo].[CCM_Hourly_Production] (
//             [Id] INT IDENTITY(1,1) PRIMARY KEY,
//             [Hour_Timestamp] DATETIME2 NOT NULL,
//             [Actual_Production] INT NOT NULL,
//             [Expected_Production] INT NOT NULL,
//             [CreatedAt] DATETIME2 DEFAULT GETDATE()
//         );
//     `);
// }

// async function calculateAndStoreHourlyProduction(defaultExpected = 18) {
//     const pool = await getBdpCcmPool();
//     await ensureTableExists(pool);

//     // Explicitly query source data with full schema qualification
//     const aggregateQuery = `
//         SELECT 
//             DATEADD(hour, DATEDIFF(hour, 0, [LocalTimestamp]), 0) AS Hour_Timestamp,
//             (MAX([Pipe_Count]) - MIN([Pipe_Count]) + 1) AS Actual_Production
//         FROM ${SOURCE_TABLE}
//         WHERE [Pipe_Count] IS NOT NULL 
//           AND [LocalTimestamp] IS NOT NULL
//         GROUP BY DATEADD(hour, DATEDIFF(hour, 0, [LocalTimestamp]), 0)
//         ORDER BY Hour_Timestamp ASC;
//     `;

//     const request = pool.request();
//     const result = await request.query(aggregateQuery);

//     console.log(`[Hourly Calculation] Rows fetched from source table: ${result.recordset.length}`);

//     if (result.recordset.length === 0) {
//         console.log("[Warning] No rows returned from [dbo].[CCM 04]. Check if LocalTimestamp or Pipe_Count contains data.");
//     }

//     for (const row of result.recordset) {
//         const hourTs = row.Hour_Timestamp;
//         const actual = row.Actual_Production;
//         const expected = defaultExpected;

//         const upsertReq = pool.request();
//         upsertReq.input("hourTs", sql.DateTime2, hourTs);
//         upsertReq.input("actual", sql.Int, actual);
//         upsertReq.input("expected", sql.Int, expected);

//         await upsertReq.query(`
//             IF EXISTS (SELECT 1 FROM ${TABLE} WHERE [Hour_Timestamp] = @hourTs)
//                 UPDATE ${TABLE} 
//                 SET [Actual_Production] = @actual, 
//                     [Expected_Production] = @expected
//                 WHERE [Hour_Timestamp] = @hourTs;
//             ELSE
//                 INSERT INTO ${TABLE} ([Hour_Timestamp], [Actual_Production], [Expected_Production])
//                 VALUES (@hourTs, @actual, @expected);
//         `);
//     }

//     return await findAllHourly();
// }

// async function findAllHourly() {
//     const pool = await getBdpCcmPool();
//     await ensureTableExists(pool);
//     const result = await pool.request().query(`SELECT * FROM ${TABLE} ORDER BY [Hour_Timestamp] DESC`);
//     return result.recordset;
// }

// module.exports = {
//     calculateAndStoreHourlyProduction,
//     findAllHourly
// };