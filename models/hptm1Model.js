// const { getHptm1Pool } = require("../config/sqlDb");

// class Hptm1Model {
//     static async getAllTestData() {
//         try {
//             const pool = await getHptm1Pool();
//             const result = await pool.request().query(`
//                 SELECT TOP (1000) 
//                     [Timestamp],
//                     [LocalTimestamp],
//                     [Id],
//                     [NO1_Station_Pressure_Max],
//                     [Log_Trigger_1],
//                     [NO2_Station_Pressure_Max],
//                     [Log_Trigger_2],
//                     [Class_Selected],
//                     [Dia_Selected],
//                     [Pipe_Count_Record1],
//                     [Pipe_Count_Record2],
//                     [Test_Time_Record1],
//                     [Test_Time_Record2],
//                     [Pipe_Count_Record1_Good],
//                     [Pipe_Count_Record2_Good],
//                     [Rejection_Reason_1],
//                     [Rejection_Reason_2],
//                     [PipeNumber_1],
//                     [PipeNumber_2],
//                     [MECHINE_NUMBER_ENTRY],
//                     [PIPE_NUMBER_ENTRY],
//                     [OPERATOR_SAP_NO_ENTRY],
//                     [INCHARGE_NAME],
//                     [SHIFT_ABC_ENTRY],
//                     [MONTH_A_TO_M_ENTRY],
//                     [DATE_ENTRY],
//                     [PIPE_I_REJECTION_COUNT],
//                     [PIPE_2_REJECTION_COUNT],
//                     [PIPE_2_SHIFT_ABC_ENTRY],
//                     [PIPE_2_DATE_ENTRY],
//                     [PIPE_2_MONTH_A_TO_M_ENTRY],
//                     [PIPE_2_MECHINE_NUMBER_ENTRY],
//                     [PIPE_2_PIPE_NUMBER_ENTRY],
//                     [PIPE_I_REWORK_PIPE_COUNT],
//                     [PIPE_2_REWORK_PIPE_COUNT],
//                     [Length_Selected],
//                     [Length_5p5],
//                     [Length_6p0],
//                     [NO1_Station_High_Pressure_Water_Pressure],
//                     [NO2_Station_High_Pressure_Water_Pressure],
//                     [SA00aa],
//                     [Act_Pipe_Dia_Selected],
//                     [PRE],
//                     [ACC]
//                 FROM [dbo].[test_1]
//                 ORDER BY [Id] DESC
//             `);
//             return result.recordset;
//         } catch (error) {
//             throw new Error(`Error fetching HPTM 1 test data: ${error.message}`);
//         }
//     }
// }

// module.exports = Hptm1Model;


const { sql, getHPTM1Pool } = require("../config/sqlDb");

const COLUMNS = `
    [Timestamp],
    [LocalTimestamp],
    [Id],
    [NO1_Station_Pressure_Max],
    [Log_Trigger_1],
    [NO2_Station_Pressure_Max],
    [Log_Trigger_2],
    [Class_Selected],
    [Dia_Selected],
    [Pipe_Count_Record1],
    [Pipe_Count_Record2],
    [Test_Time_Record1],
    [Test_Time_Record2],
    [Pipe_Count_Record1_Good],
    [Pipe_Count_Record2_Good],
    [Rejection_Reason_1],
    [Rejection_Reason_2],
    [PipeNumber_1],
    [PipeNumber_2],
    [MECHINE_NUMBER_ENTRY],
    [PIPE_NUMBER_ENTRY],
    [OPERATOR_SAP_NO_ENTRY],
    [INCHARGE_NAME],
    [SHIFT_ABC_ENTRY],
    [MONTH_A_TO_M_ENTRY],
    [DATE_ENTRY],
    [PIPE_I_REJECTION_COUNT],
    [PIPE_2_REJECTION_COUNT],
    [PIPE_2_SHIFT_ABC_ENTRY],
    [PIPE_2_DATE_ENTRY],
    [PIPE_2_MONTH_A_TO_M_ENTRY],
    [PIPE_2_MECHINE_NUMBER_ENTRY],
    [PIPE_2_PIPE_NUMBER_ENTRY],
    [PIPE_I_REWORK_PIPE_COUNT],
    [PIPE_2_REWORK_PIPE_COUNT],
    [Length_Selected],
    [Length_5p5],
    [Length_6p0],
    [NO1_Station_High_Pressure_Water_Pressure],
    [NO2_Station_High_Pressure_Water_Pressure],
    [SA00aa],
    [Act_Pipe_Dia_Selected],
    [PRE],
    [ACC]`;

class Hptm1Model {
    /** Latest 1000 rows (used when no date range is given) */
    static async getAllTestData() {
        try {
            const pool = await getHPTM1Pool();
            const result = await pool.request().query(`
                SELECT TOP (1000) ${COLUMNS}
                FROM [dbo].[test_1]
                ORDER BY [Id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching HPTM 1 test data: ${error.message}`);
        }
    }

    /**
     * All rows between two plant-local times. LocalTimestamp is plant-local, and the
     * mssql driver treats JS dates as UTC, so "2026-10-14T06:00:00Z" matches 06:00 local.
     */
    static async getTestDataBetween(from, to) {
        try {
            const pool = await getHPTM1Pool();
            const result = await pool.request()
                .input("from", sql.DateTime, from)
                .input("to", sql.DateTime, to)
                .query(`
                    SELECT ${COLUMNS}
                    FROM [dbo].[test_1]
                    WHERE [LocalTimestamp] BETWEEN @from AND @to
                    ORDER BY [Id] DESC
                `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching HPTM 1 test data: ${error.message}`);
        }
    }
}

module.exports = Hptm1Model;