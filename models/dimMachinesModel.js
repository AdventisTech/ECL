// const { getHptmPool, sql } = require("../config/sqlDb"); // Adjust path to sqlDb.js as needed[cite: 1]

// class DimMachinesModel {
//     // Get all machines
//     static async getAll() {
//         const pool = await getHptmPool();
//         const result = await pool.request().query("SELECT * FROM Dim_Machines");
//         return result.recordset;
//     }

//     // Get machine by ID
//     static async getById(id) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("MachineID", sql.Int, id)
//             .query("SELECT * FROM Dim_Machines WHERE MachineID = @MachineID");
//         return result.recordset[0];
//     }

//     // Create a new machine
//     static async create(data) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("MachineCode", sql.VarChar, data.MachineCode)
//             .input("MachineName", sql.VarChar, data.MachineName)
//             .input("Department", sql.VarChar, data.Department)
//             .input("IsActive", sql.Bit, data.IsActive)
//             .query(`
//                 INSERT INTO Dim_Machines (MachineCode, MachineName, Department, IsActive)
//                 OUTPUT INSERTED.*
//                 VALUES (@MachineCode, @MachineName, @Department, @IsActive)
//             `);
//         return result.recordset[0];
//     }

//     // Update a machine
//     static async update(id, data) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("MachineID", sql.Int, id)
//             .input("MachineCode", sql.VarChar, data.MachineCode)
//             .input("MachineName", sql.VarChar, data.MachineName)
//             .input("Department", sql.VarChar, data.Department)
//             .input("IsActive", sql.Bit, data.IsActive)
//             .query(`
//                 UPDATE Dim_Machines 
//                 SET MachineCode = @MachineCode, 
//                     MachineName = @MachineName, 
//                     Department = @Department, 
//                     IsActive = @IsActive
//                 OUTPUT INSERTED.*
//                 WHERE MachineID = @MachineID
//             `);
//         return result.recordset[0];
//     }

//     // Delete a machine
//     static async delete(id) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("MachineID", sql.Int, id)
//             .query(`
//                 DELETE FROM Dim_Machines 
//                 OUTPUT DELETED.*
//                 WHERE MachineID = @MachineID
//             `);
//         return result.recordset[0];
//     }
// }

// module.exports = DimMachinesModel;