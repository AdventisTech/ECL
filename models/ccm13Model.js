const { getBdpCcmnewPool } = require("../config/sqlDb");

class Ccm13Model {
    static async getAllCcm13Data() {
        try {
            const pool = await getBdpCcmnewPool();
            const result = await pool.request().query(`
                SELECT TOP (1000) *
                FROM [dbo].[ccm 13]
                ORDER BY [Id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching ccm 13 data: ${error.message}`);
        }
    }
}

module.exports = Ccm13Model;