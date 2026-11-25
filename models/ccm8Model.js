const { getBdpCcmnewPool } = require("../config/sqlDb");

class Ccm8Model {
    static async getAllCcm8Data() {
        try {
            const pool = await getBdpCcmnewPool();
            const result = await pool.request().query(`
                SELECT TOP (1000) *
                FROM [dbo].[ccm 8]
                ORDER BY [Id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching ccm 8 data: ${error.message}`);
        }
    }
}

module.exports = Ccm8Model;