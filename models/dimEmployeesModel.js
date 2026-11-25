// const { getHptmPool, sql } = require("../config/sqlDb"); // Adjust path to sqlDb.js as needed[cite: 1]

// class DimEmployeesModel {
//     // Get all employees
//     static async getAll() {
//         const pool = await getHptmPool();
//         const result = await pool.request().query("SELECT * FROM Dim_Employees");
//         return result.recordset;
//     }

//     // Get employee by ID
//     static async getById(id) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("EmpID", sql.Int, id)
//             .query("SELECT * FROM Dim_Employees WHERE EmpID = @EmpID");
//         return result.recordset[0];
//     }

//     // Create a new employee
//     static async create(data) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("EmpName", sql.VarChar, data.EmpName)
//             .query(`
//                 INSERT INTO Dim_Employees (EmpName)
//                 OUTPUT INSERTED.*
//                 VALUES (@EmpName)
//             `);
//         return result.recordset[0];
//     }

//     // Update an employee
//     static async update(id, data) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("EmpID", sql.Int, id)
//             .input("EmpName", sql.VarChar, data.EmpName)
//             .query(`
//                 UPDATE Dim_Employees 
//                 SET EmpName = @EmpName
//                 OUTPUT INSERTED.*
//                 WHERE EmpID = @EmpID
//             `);
//         return result.recordset[0];
//     }

//     // Delete an employee
//     static async delete(id) {
//         const pool = await getHptmPool();
//         const result = await pool.request()
//             .input("EmpID", sql.Int, id)
//             .query(`
//                 DELETE FROM Dim_Employees 
//                 OUTPUT DELETED.*
//                 WHERE EmpID = @EmpID
//             `);
//         return result.recordset[0];
//     }
// }

// module.exports = DimEmployeesModel;