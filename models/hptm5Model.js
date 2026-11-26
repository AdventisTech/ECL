// const { getHptm5Pool, sql } = require("../config/sqlDb");

// class Hptm5Model {
//     // Execute the GetHPTM5 stored procedure with date range parameters
//     static async getReportData(fromDateTime, toDateTime) {
//         const pool = await getHptm5Pool();
//         const result = await pool.request()
//             .input("FromDateTime", sql.DateTime, fromDateTime)
//             .input("ToDateTime", sql.DateTime, toDateTime)
//             .execute("GetHPTM5");
        
//         return result.recordset;
//     }

//     // Execute the GetHPTM5_Day_Summary stored procedure with a target date
//     static async getDaySummaryData(selDate) {
//         const pool = await getHptm5Pool();
//         const result = await pool.request()
//             .input("SelDate", sql.Date, selDate)
//             .execute("GetHPTM5_Day_Summary");
        
//         return result.recordset;
//     }


//     // Execute the GetHPTM5_Shift_Class_Size stored procedure with a target date
//     static async getShiftClassSizeData(selDate) {
//         const pool = await getHptm5Pool();
//         const result = await pool.request()
//             .input("SelDate", sql.Date, selDate)
//             .execute("GetHPTM5_Shift_Class_Size");
        
//         return result.recordset;
//     }

//     // Execute the GetHPTM5_Shift_Summary stored procedure with target date and shift
//     static async getShiftSummaryData(selDate, selShift) {
//         const pool = await getHptm5Pool();
//         const result = await pool.request()
//             .input("SelDate", sql.Date, selDate)
//             .input("SelShift", sql.VarChar(1), selShift)
//             .execute("GetHPTM5_Shift_Summary");
        
//         return result.recordset;
//     }
// }

// module.exports = Hptm5Model;


const { getHPTM5Pool, sql } = require("../config/sqlDb");

class Hptm5Model {
    static async getReportData(fromDateTime, toDateTime) {
        const pool = await getHPTM5Pool();
        const result = await pool.request()
            .input("FromDateTime", sql.DateTime, fromDateTime)
            .input("ToDateTime", sql.DateTime, toDateTime)
            .execute("GetHPTM5");
        return result.recordset;
    }

    static async getDaySummaryData(selDate) {
        const pool = await getHPTM5Pool();
        const result = await pool.request()
            .input("SelDate", sql.Date, selDate)
            .execute("GetHPTM5_Day_Summary");
        return result.recordset;
    }

    static async getShiftClassSizeData(selDate) {
        const pool = await getHPTM5Pool();
        const result = await pool.request()
            .input("SelDate", sql.Date, selDate)
            .execute("GetHPTM5_Shift_Class_Size");
        return result.recordset;
    }

    static async getShiftSummaryData(selDate, selShift) {
        const pool = await getHPTM5Pool();
        const result = await pool.request()
            .input("SelDate", sql.Date, selDate)
            .input("SelShift", sql.VarChar(1), selShift)
            .execute("GetHPTM5_Shift_Summary");
        return result.recordset;
    }

    // Newest reading in the machine log (used for the Running/Idle badge and the "last data" fallback)
    static async getLastData() {
        const pool = await getHPTM5Pool();
        const found = await pool.request().query("SELECT OBJECT_ID(N'dbo.HPTM5') AS t1, OBJECT_ID(N'dbo.HPT') AS t2");
        const f = found.recordset[0] || {};
        const table = f.t1 ? "dbo.HPTM5" : f.t2 ? "dbo.HPT" : null;
        if (!table) throw new Error("HPTM5 data table not found (looked for dbo.HPTM5 and dbo.HPT)");
        const result = await pool.request().query(`SELECT MAX(_TIMESTAMP) AS LastTimestamp FROM ${table}`);
        return result.recordset;
    }
}

module.exports = Hptm5Model;