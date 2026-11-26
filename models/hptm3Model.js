// const { getHptm3Pool, sql } = require("../config/sqlDb");

// class Hptm3Model {
//     // 1. Main report (date range)
//     static async getReportData(fromDateTime, toDateTime) {
//         const pool = await getHptm3Pool();
//         const result = await pool.request()
//             .input("FromDateTime", sql.DateTime, fromDateTime)
//             .input("ToDateTime", sql.DateTime, toDateTime)
//             .execute("GetHPTM3");
//         return result.recordset;
//     }

//     // 2. Day summary
//     static async getDaySummaryData(selDate) {
//         const pool = await getHptm3Pool();
//         const result = await pool.request()
//             .input("SelDate", sql.Date, selDate)
//             .execute("GetHPTM3_Day_Summary");
//         return result.recordset;
//     }

//     // 3. Shift summary
//     static async getShiftSummaryData(selDate, selShift) {
//         const pool = await getHptm3Pool();
//         const result = await pool.request()
//             .input("SelDate", sql.Date, selDate)
//             .input("SelShift", sql.VarChar(1), selShift)
//             .execute("GetHPTM3_Shift_Summary");
//         return result.recordset;
//     }

//     // 4. Newest machine timestamp (Running / Idle pill)
//     static async getLastData() {
//         const pool = await getHptm3Pool();
//         const result = await pool.request()
//             .query("SELECT MAX(_TIMESTAMP) AS LastTimestamp FROM dbo.HPTM3");
//         return result.recordset;
//     }
// }

// module.exports = Hptm3Model;


const { getHPTM3Pool, sql } = require("../config/sqlDb");
const { dayWindow, summarise } = require("./hptm3Summary");

/**
 * HPTM 3 data access. Uses ONLY the stored procedures that already exist on the HPTM3 database:
 *   GetHPTM3                 (@FromDateTime, @ToDateTime)  one row per logged second
 *   GetHPTM3_Shift_Summary   (@FromDateTime, @ToDateTime)  same rows plus SN1 / SN2
 * The day and shift figures the dashboard shows are worked out from those rows in ./hptm3Summary.js.
 */
class Hptm3Model {
    // 1. Main report (date range) - unchanged
    static async getReportData(fromDateTime, toDateTime) {
        const pool = await getHPTM3Pool();
        const result = await pool.request()
            .input("FromDateTime", sql.DateTime, fromDateTime)
            .input("ToDateTime", sql.DateTime, toDateTime)
            .execute("GetHPTM3");
        return result.recordset;
    }

    // Reads one production day (selDate 06:00 to the next day 06:00, plus a few hours before it)
    // from a procedure that takes a date range.
    static async readDay(selDate, procedure) {
        const { from, to } = dayWindow(selDate);
        const pool = await getHPTM3Pool();
        const result = await pool.request()
            // Sent as text and converted by SQL Server, so the Node time zone cannot shift the window.
            .input("FromDateTime", sql.VarChar(19), from)
            .input("ToDateTime", sql.VarChar(19), to)
            .execute(procedure);
        return result.recordset;
    }

    // 2. Day summary: every shift of the production day that starts on selDate at 06:00
    static async getDaySummaryData(selDate) {
        const rows = await Hptm3Model.readDay(selDate, "GetHPTM3");
        return summarise(rows, selDate);
    }

    // 3. Shift summary: A, B or C of that production day
    static async getShiftSummaryData(selDate, selShift) {
        const shift = String(selShift).trim().toUpperCase();
        const rows = await Hptm3Model.readDay(selDate, "GetHPTM3_Shift_Summary");
        return summarise(rows, selDate).filter((r) => r.Shift === shift);
    }

    // 4. Newest machine timestamp (Running / Idle pill and "last day with data")
    static async getLastData() {
        const pool = await getHPTM3Pool();
        const result = await pool.request()
            .query("SELECT MAX(_TIMESTAMP) AS LastTimestamp FROM dbo.HPTM3");
        return result.recordset;
    }
}

module.exports = Hptm3Model;