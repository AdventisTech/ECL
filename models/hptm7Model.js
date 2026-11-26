// const { getHptm7Pool, sql } = require("../config/sqlDb");

// class Hptm7Model {
//     // Execute the GetHPTM7 stored procedure with date range parameters
//     static async getReportData(fromDateTime, toDateTime) {
//         const pool = await getHptm7Pool();
//         const result = await pool.request()
//             .input("FromDateTime", sql.DateTime, fromDateTime)
//             .input("ToDateTime", sql.DateTime, toDateTime)
//             .execute("GetHPTM7");
        
//         return result.recordset;
//     }
// }

// module.exports = Hptm7Model;


const { getHPTM7Pool, sql } = require("../config/sqlDb");

class Hptm7Model {
    // Execute the GetHPTM7 stored procedure with date range parameters
    static async getReportData(fromDateTime, toDateTime) {
        const pool = await getHPTM7Pool();
        const result = await pool.request()
            .input("FromDateTime", sql.DateTime, fromDateTime)
            .input("ToDateTime", sql.DateTime, toDateTime)
            .execute("GetHPTM7");

        return result.recordset;
    }

    // Newest saved reading on either station. Never throws if the stored procedure works:
    // 1) direct MAX over the two log tables (Marker compared as text)
    // 2) the same without the Marker filter
    // 3) the stored procedure itself over the last 3 days (the call the dashboard already uses)
    static async getLastData() {
        const pool = await getHPTM7Pool();
        const newest = (where) => `
            SELECT MAX(t) AS LastTimestamp FROM (
                SELECT MAX(DateAndTime) AS t FROM dbo.FloatHPTM7_1 ${where}
                UNION ALL
                SELECT MAX(DateAndTime) AS t FROM dbo.FloatHPTM7_2 ${where}
            ) x`;
        const attempts = [
            () => pool.request().query(newest("WHERE CAST(Marker AS VARCHAR(10)) = 'S'")),
            () => pool.request().query(newest("")),
        ];
        for (const run of attempts) {
            try {
                const r = await run();
                if (r.recordset[0] && r.recordset[0].LastTimestamp) return r.recordset;
            } catch (err) {
                console.error("HPTM7 last-data query failed:", err.message);
            }
        }
        // Fallback: use the stored procedure
        const to = new Date();
        const from = new Date(to.getTime() - 3 * 24 * 3600 * 1000);
        const sp = await pool.request()
            .input("FromDateTime", sql.DateTime, from)
            .input("ToDateTime", sql.DateTime, to)
            .execute("GetHPTM7");
        let max = null;
        for (const row of sp.recordset) {
            const t = row.TestDateTime ? new Date(row.TestDateTime) : null;
            if (t && (!max || t > max)) max = t;
        }
        return [{ LastTimestamp: max }];
    }
}

module.exports = Hptm7Model;