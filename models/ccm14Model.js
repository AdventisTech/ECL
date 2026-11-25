const { getBdpCcmnewPool } = require("../config/sqlDb");

class Ccm14Model {
    static async getAllCcm14Data() {
        try {
            const pool = await getBdpCcmnewPool();
            const result = await pool.request().query(`
                SELECT TOP (1000) *
                FROM [dbo].[ccm 14]
                ORDER BY [Id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching ccm 14 data: ${error.message}`);
        }
    }
}

module.exports = Ccm14Model;