const { getcmlPool } = require("../config/sqlDb");

class CmlModel {
    static async getAllCmlData() {
        try {
            const pool = await getcmlPool();
            const result = await pool.request().query(`
                SELECT 
                    [id],
                    [cycle_time],
                    [no_of_pipes],
                    [pipe_size],
                    [slurry_pump_rpm],
                    [lance_trolley_rpm],
                    [spinning_rpm],
                    [spinning_time],
                    [mix],
                    [batch_no],
                    [cement_quantity],
                    [sand_quantity],
                    [water_quantity],
                    [mix_time],
                    [report],
                    [display],
                    [to_operator]
                    [timstamp]
                FROM [dbo].[cml1]
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching CML data: ${error.message}`);
        }
    }
}

module.exports = CmlModel;