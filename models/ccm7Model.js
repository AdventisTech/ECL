const { getBdpCcmnewPool } = require("../config/sqlDb");

class Ccm7Model {
    static async getAllCcm7Data() {
        try {
            const pool = await getBdpCcmnewPool();
            const result = await pool.request().query(`
                SELECT TOP (1000) *
                FROM [dbo].[ccm 7]
                ORDER BY [Id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching ccm 7 data: ${error.message}`);
        }
    }
}

module.exports = Ccm7Model;