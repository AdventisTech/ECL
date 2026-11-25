// const { getHptmPool, sql } = require("../config/sqlDb"); // Adjust path to sqlDb.js as needed[cite: 1]

// class DimRejectionReasonsModel {
//     // Get all rejection reasons
//     static async getAll() {
//         const pool = await getHptmPool(); //[cite: 1]
//         const result = await pool.request().query("SELECT * FROM Dim_RejectionReasons");
//         return result.recordset;
//     }

//     // Get rejection reason by ID
//     static async getById(id) {
//         const pool = await getHptmPool(); //[cite: 1]
//         const result = await pool.request()
//             .input("RejectionID", sql.Int, id)
//             .query("SELECT * FROM Dim_RejectionReasons WHERE RejectionID = @RejectionID");
//         return result.recordset[0];
//     }

//     // Create a new rejection reason
//     static async create(data) {
//         const pool = await getHptmPool(); //[cite: 1]
//         const result = await pool.request()
//             .input("RejectionReason", sql.VarChar, data.RejectionReason)
//             .query(`
//                 INSERT INTO Dim_RejectionReasons (RejectionReason)
//                 OUTPUT INSERTED.*
//                 VALUES (@RejectionReason)
//             `);
//         return result.recordset[0];
//     }

//     // Update a rejection reason
//     static async update(id, data) {
//         const pool = await getHptmPool(); //[cite: 1]
//         const result = await pool.request()
//             .input("RejectionID", sql.Int, id)
//             .input("RejectionReason", sql.VarChar, data.RejectionReason)
//             .query(`
//                 UPDATE Dim_RejectionReasons 
//                 SET RejectionReason = @RejectionReason
//                 OUTPUT INSERTED.*
//                 WHERE RejectionID = @RejectionID
//             `);
//         return result.recordset[0];
//     }

//     // Delete a rejection reason
//     static async delete(id) {
//         const pool = await getHptmPool(); //[cite: 1]
//         const result = await pool.request()
//             .input("RejectionID", sql.Int, id)
//             .query(`
//                 DELETE FROM Dim_RejectionReasons 
//                 OUTPUT DELETED.*
//                 WHERE RejectionID = @RejectionID
//             `);
//         return result.recordset[0];
//     }
// }

// module.exports = DimRejectionReasonsModel;