// const { getHptm4Pool, sql } = require("../config/sqlDb");

// class Hptm4Model {
//     // 1. Main Report Data
//     static async getReportData(fromDateTime, toDateTime) {
//         const pool = await getHptm4Pool();
//         const result = await pool.request()
//             .input("FromDateTime", sql.DateTime, fromDateTime)
//             .input("ToDateTime", sql.DateTime, toDateTime)
//             .execute("GetHPTM4");

//         return result.recordset;
//     }

//     // 2. Day Summary Report Data
//     static async getDaySummaryData(selDate) {
//         const pool = await getHptm4Pool();
//         const result = await pool.request()
//             .input("SelDate", sql.Date, selDate)
//             .execute("GetHPTM4_Day_Summary");

//         return result.recordset;
//     }

//     // 3. Shift Summary Report Data
//     static async getShiftSummaryData(selDate, selShift) {
//         const pool = await getHptm4Pool();
//         const result = await pool.request()
//             .input("SelDate", sql.Date, selDate)
//             .input("SelShift", sql.VarChar(1), selShift)
//             .execute("GetHPTM4_Shift_Summary");

//         return result.recordset;
//     }
  
// }

// module.exports = Hptm4Model;


const { getHPTM4Pool, sql } = require("../config/sqlDb");

class Hptm4Model {
    // 1. Main Report Data
    static async getReportData(fromDateTime, toDateTime) {
        const pool = await getHPTM4Pool();
        const result = await pool.request()
            .input("FromDateTime", sql.DateTime, fromDateTime)
            .input("ToDateTime", sql.DateTime, toDateTime)
            .execute("GetHPTM4");

        return result.recordset;
    }

    // 2. Day Summary Report Data
    static async getDaySummaryData(selDate) {
        const pool = await getHPTM4Pool();
        const result = await pool.request()
            .input("SelDate", sql.Date, selDate)
            .execute("GetHPTM4_Day_Summary");

        return result.recordset;
    }

    // 3. Shift Summary Report Data
    static async getShiftSummaryData(selDate, selShift) {
        const pool = await getHPTM4Pool();
        const result = await pool.request()
            .input("SelDate", sql.Date, selDate)
            .input("SelShift", sql.VarChar(1), selShift)
            .execute("GetHPTM4_Shift_Summary");

        return result.recordset;
    }

    // 4. Newest machine timestamp (Running / Idle pill).
    // The data table is dbo.HPTM4 on some servers and dbo.HPT on others, so look for both (fixed names only).
    static async getLastData() {
        const pool = await getHPTM4Pool();
        const found = await pool.request()
            .query("SELECT OBJECT_ID(N'dbo.HPTM4') AS t1, OBJECT_ID(N'dbo.HPT') AS t2");
        const f = found.recordset[0] || {};
        const table = f.t1 ? "dbo.HPTM4" : f.t2 ? "dbo.HPT" : null;
        if (!table) throw new Error("HPTM4 data table not found (looked for dbo.HPTM4 and dbo.HPT)");

        const result = await pool.request()
            .query(`SELECT MAX(_TIMESTAMP) AS LastTimestamp FROM ${table}`);
        return result.recordset;
    }
}

module.exports = Hptm4Model;