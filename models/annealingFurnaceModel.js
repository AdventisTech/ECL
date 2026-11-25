const { getannealingPool } = require("../config/sqlDb");

class AnnealingFurnaceModel {
    static async getAllAnnealingData() {
        try {
            const pool = await getannealingPool();
            const result = await pool.request().query(`
                SELECT 
                    [id],
                    [chain_speed],
                    [zone_wise_temperatures],
                    [zone_wise_bfg_flow_and_pressure],
                    [zone_wise_air_flow_and_pressure],
                    [flue_gas_temperature_af_1_2_3],
                    [air_curtain_blower_status],
                    [three_way_valve_temperature],
                    [timestamp]
                FROM [dbo].[annealing_furnace_data]
                ORDER BY [id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching annealing furnace data: ${error.message}`);
        }
    }
}

module.exports = AnnealingFurnaceModel;