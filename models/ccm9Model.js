const { getBdpCcmnewPool } = require("../config/sqlDb");

class Ccm9Model {
    static async getAllCcm9Data() {
        try {
            const pool = await getBdpCcmnewPool();
            const result = await pool.request().query(`
                SELECT TOP (1000) *
                FROM [dbo].[ccm 9]
                ORDER BY [Id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching ccm 9 data: ${error.message}`);
        }
    }
}

module.exports = Ccm9Model;