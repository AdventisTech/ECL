// const { getBdpCcmnewPool } = require("../config/sqlDb");

// class CoreShooterModel {
//     static async getAllCoreShooterData() {
//         try {
//             const pool = await getBdpCcmnewPool();
//             const result = await pool.request().query(`
//                 SELECT TOP (1000) 
//                     [id],
//                     [core_size],
//                     [no_of_core_produced],
//                     [cycle_time],
//                     [core_oven_temp_z1],
//                     [core_oven_temp_z2],
//                     [core_oven_temp_z3],
//                     [sand_mixing_time],
//                     [resin_time],
//                     [hardner_time],
//                     [amine_time_post_adding],
//                     [amine_gas_temp],
//                     [gasing_time],
//                     [sand_dryer_temp]
//                 FROM [dbo].[core_shooter_data]
//             `);
//             return result.recordset;
//         } catch (error) {
//             throw new Error(`Error fetching core shooter data: ${error.message}`);
//         }
//     }
// }

// module.exports = CoreShooterModel;


const { getcoreshoolerPool } = require("../config/sqlDb");

class CoreShooterModel {
    static async getAllCoreShooterData() {
        try {
            const pool = await getcoreshoolerPool();
            const result = await pool.request().query(`
                SELECT
                    [id],
                    [core_size],
                    [no_of_core_produced],
                    [cycle_time],
                    [core_oven_temp_z1],
                    [core_oven_temp_z2],
                    [core_oven_temp_z3],
                    [sand_mixing_time],
                    [resin_time],
                    [hardner_time],
                    [amine_time_post_adding],
                    [amine_gas_temp],
                    [gasing_time],
                    [sand_dryer_temp],
                    [timestamp]
                FROM [dbo].[core_shooter_data]
                ORDER BY [id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching core shooter data: ${error.message}`);
        }
    }
}

module.exports = CoreShooterModel;