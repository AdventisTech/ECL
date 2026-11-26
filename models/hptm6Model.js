// const { getHptm6Pool, sql } = require("../config/sqlDb");

// class Hptm6Model {
//     // 1. Main report (date range) — requires a GetHPTM6 SP in HPTM6
//     static async getReportData(fromDateTime, toDateTime) {
//         const pool = await getHptm6Pool();
//         const result = await pool.request()
//             .input("FromDateTime", sql.DateTime, fromDateTime)
//             .input("ToDateTime", sql.DateTime, toDateTime)
//             .execute("GetHPTM6");
//         return result.recordset;
//     }

//     // 2. Day summary
//     static async getDaySummaryData(selDate) {
//         const pool = await getHptm6Pool();
//         const result = await pool.request()
//             .input("SelDate", sql.Date, selDate)
//             .execute("GetHPTM6_Day_Summary");
//         return result.recordset;
//     }

//     // 3. Shift summary
//     static async getShiftSummaryData(selDate, selShift) {
//         const pool = await getHptm6Pool();
//         const result = await pool.request()
//             .input("SelDate", sql.Date, selDate)
//             .input("SelShift", sql.VarChar(1), selShift)
//             .execute("GetHPTM6_Shift_Summary");
//         return result.recordset;
//     }

//     // 4. Newest machine timestamp (Running / Idle pill)
//     static async getLastData() {
//         const pool = await getHptm6Pool();
//         const result = await pool.request()
//             .query("SELECT MAX(_TIMESTAMP) AS LastTimestamp FROM dbo.HPTM6");
//         return result.recordset;
//     }
// }

// module.exports = Hptm6Model;


const { getHPTM6Pool, sql } = require("../config/sqlDb");

class Hptm6Model {
    static async getReportData(fromDateTime, toDateTime) {
        const pool = await getHPTM6Pool();
        const result = await pool.request()
            .input("FromDateTime", sql.DateTime, fromDateTime)
            .input("ToDateTime", sql.DateTime, toDateTime)
            .execute("GetHPTM6");
        return result.recordset;
    }

    static async getDaySummaryData(selDate) {
        const pool = await getHPTM6Pool();
        const result = await pool.request()
            .input("SelDate", sql.Date, selDate)
            .execute("GetHPTM6_Day_Summary");
        return result.recordset;
    }

    static async getShiftSummaryData(selDate, selShift) {
        const pool = await getHPTM6Pool();
        const result = await pool.request()
            .input("SelDate", sql.Date, selDate)
            .input("SelShift", sql.VarChar(1), selShift)
            .execute("GetHPTM6_Shift_Summary");
        return result.recordset;
    }

    // Newest reading in the machine log (Running/Idle badge and the "last data" fallback)
    static async getLastData() {
        const pool = await getHPTM6Pool();
        const found = await pool.request().query("SELECT OBJECT_ID(N'dbo.HPTM6') AS t1, OBJECT_ID(N'dbo.HPT') AS t2");
        const f = found.recordset[0] || {};
        const table = f.t1 ? "dbo.HPTM6" : f.t2 ? "dbo.HPT" : null;
        if (!table) throw new Error("HPTM6 data table not found (looked for dbo.HPTM6 and dbo.HPT)");
        const result = await pool.request().query(`SELECT MAX(_TIMESTAMP) AS LastTimestamp FROM ${table}`);
        return result.recordset;
    }
}

module.exports = Hptm6Model;