// const { getBdpCcmnewPool } = require("../config/sqlDb");

// class BitumenModel {
//     static async getAllBitumenData() {
//         try {
//             const pool = await getBdpCcmnewPool();
//             const result = await pool.request().query(`
//                 SELECT TOP (1000) 
//                     [id],
//                     [cycle_time],
//                     [pipe_no],
//                     [pipe_size],
//                     [pipe_class],
//                     [gun_trolley_speed],
//                     [gun_air_pressure],
//                     [bitumen_temperature],
//                     [rotator_speed],
//                     [pre_heater_temperature],
//                     [pre_heater_chain_speed],
//                     [post_heater_temperature],
//                     [post_heater_chain_speed]
//                 FROM [dbo].[bitumen_coating_data]
//             `);
//             return result.recordset;
//         } catch (error) {
//             throw new Error(`Error fetching bitumen coating data: ${error.message}`);
//         }
//     }
// }

// module.exports = BitumenModel;


const { getbitumenPool } = require("../config/sqlDb");

class BitumenModel {
    static async getAllBitumenData() {
        try {
            const pool = await getbitumenPool();
            const result = await pool.request().query(`
                SELECT
                    [id],
                    [cycle_time],
                    [pipe_no],
                    [pipe_size],
                    [pipe_class],
                    [gun_trolley_speed],
                    [gun_air_pressure],
                    [bitumen_temperature],
                    [rotator_speed],
                    [pre_heater_temperature],
                    [pre_heater_chain_speed],
                    [post_heater_temperature],
                    [post_heater_chain_speed],
                    [timestamp]
                FROM [dbo].[bitumen_coating_data]
                ORDER BY [id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching bitumen coating data: ${error.message}`);
        }
    }
}

module.exports = BitumenModel;