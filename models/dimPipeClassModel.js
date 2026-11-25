// const { getHptmPool, sql } = require("../config/sqlDb"); // Adjust path to sqlDb.js as needed[cite: 1]

// class DimPipeClassModel {
//     // Get all pipe classes
//     static async getAll() {
//         const pool = await getHptmPool();
//         const result = await pool.request().query("SELECT * FROM Dim_PipeClass");
//         return result.recordset;
//     }

//     // Get pipe class by ID
//     static async getById(id) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("PipeClassID", sql.Int, id)
//             .query("SELECT * FROM Dim_PipeClass WHERE PipeClassID = @PipeClassID");
//         return result.recordset[0];
//     }

//     // Create a new pipe class
//     static async create(data) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("PipeClassName", sql.VarChar, data.PipeClassName)
//             .query(`
//                 INSERT INTO Dim_PipeClass (PipeClassName)
//                 OUTPUT INSERTED.*
//                 VALUES (@PipeClassName)
//             `);
//         return result.recordset[0];
//     }

//     // Update a pipe class
//     static async update(id, data) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("PipeClassID", sql.Int, id)
//             .input("PipeClassName", sql.VarChar, data.PipeClassName)
//             .query(`
//                 UPDATE Dim_PipeClass 
//                 SET PipeClassName = @PipeClassName
//                 OUTPUT INSERTED.*
//                 WHERE PipeClassID = @PipeClassID
//             `);
//         return result.recordset[0];
//     }

//     // Delete a pipe class
//     static async delete(id) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("PipeClassID", sql.Int, id)
//             .query(`
//                 DELETE FROM Dim_PipeClass 
//                 OUTPUT DELETED.*
//                 WHERE PipeClassID = @PipeClassID
//             `);
//         return result.recordset[0];
//     }
// }

// module.exports = DimPipeClassModel;