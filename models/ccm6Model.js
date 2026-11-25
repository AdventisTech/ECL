const { getBdpCcmnewPool } = require("../config/sqlDb");

class Ccm6Model {
    static async getAllCcm6Data() {
        try {
            const pool = await getBdpCcmnewPool();
            const result = await pool.request().query(`
                SELECT TOP (1000) *
                FROM [dbo].[ccm 6]
                ORDER BY [Id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching ccm 6 data: ${error.message}`);
        }
    }
}

module.exports = Ccm6Model;