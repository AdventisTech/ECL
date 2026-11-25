const { getBdpCcmnewPool } = require("../config/sqlDb");

class Ccm10Model {
    static async getAllCcm10Data() {
        try {
            const pool = await getBdpCcmnewPool();
            const result = await pool.request().query(`
                SELECT TOP (1000) *
                FROM [dbo].[ccm 10]
                ORDER BY [Id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching ccm 10 data: ${error.message}`);
        }
    }
}

module.exports = Ccm10Model;