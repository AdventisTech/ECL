// const Hptm1Model = require("../models/hptm1Model");

// class Hptm1Controller {
//     static async getTestData(req, res) {
//         try {
//             const data = await Hptm1Model.getAllTestData();
//             return res.status(200).json({
//                 success: true,
//                 count: data.length,
//                 data: data
//             });
//         } catch (error) {
//             console.error("HPTM 1 Controller Error:", error.message);
//             return res.status(500).json({
//                 success: false,
//                 message: "Internal Server Error",
//                 error: error.message
//             });
//         }
//     }
// }

// module.exports = Hptm1Controller;

const Hptm1Model = require("../models/hptm1Model");

/**
 * The page sends the plant-local clock time with a trailing Z ("2026-11-10T06:00:00Z").
 * The Z is only a marker, the value is used as it is. Returns 'YYYY-MM-DDTHH:mm:ss' or null when not valid.
 */
function wallClock(v) {
    const m = /^(\d{4}-\d{2}-\d{2})[T ](\d{2}:\d{2})(?::(\d{2}))?(?:\.\d+)?Z?$/.exec(String(v).trim());
    if (!m) return null;
    const s = `${m[1]}T${m[2]}:${m[3] ?? "00"}`;
    return Number.isNaN(Date.parse(s + "Z")) ? null : s;
}

const given = (v) => v !== undefined && v !== null && String(v).trim() !== "";

class Hptm1Controller {
    // GET /api/hptm1                      newest rows
    // GET /api/hptm1?from=...&to=...      one time window (what the dashboard sends)
    static async getTestData(req, res) {
        try {
            const { from, to } = req.query;
            let f = null, t = null;

            if (given(from) !== given(to)) {
                return res.status(400).json({
                    success: false,
                    error: "Send both 'from' and 'to', or neither."
                });
            }
            if (given(from)) {
                f = wallClock(from);
                t = wallClock(to);
                if (!f || !t) {
                    return res.status(400).json({
                        success: false,
                        error: "'from' and 'to' must look like 2026-11-10T06:00:00Z."
                    });
                }
                if (f > t) {
                    return res.status(400).json({
                        success: false,
                        error: "'from' must not be later than 'to'."
                    });
                }
            }

            const data = await Hptm1Model.getAllTestData(f, t);
            return res.status(200).json({
                success: true,
                count: data.length,
                data: data
            });
        } catch (error) {
            console.error("HPTM 1 Controller Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = Hptm1Controller;