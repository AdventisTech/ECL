// const { getBdpCcmnewPool } = require("../config/sqlDb");

// class ZincModel {
//     static async getAllZincData() {
//         try {
//             const pool = await getBdpCcmnewPool();
//             const result = await pool.request().query(`
//                 SELECT TOP (1000) 
//                     [id],
//                     [cycle_time],
//                     [no_of_pipes],
//                     [pipe_size],
//                     [pipe_class],
//                     [gun_trolley_speed],
//                     [gun_current],
//                     [rotator_speed],
//                     [gun_air_pressure]
//                 FROM [dbo].[zinc_data]
//             `);
//             return result.recordset;
//         } catch (error) {
//             throw new Error(`Error fetching zinc data: ${error.message}`);
//         }
//     }
// }

// module.exports = ZincModel;


const { getzincPool } = require("../config/sqlDb");

class ZincModel {
    static async getAllZincData() {
        try {
            const pool = await getzincPool();
            const result = await pool.request().query(`
                SELECT  
                    [id],
                    [cycle_time],
                    [no_of_pipes],
                    [pipe_size],
                    [pipe_class],
                    [gun_trolley_speed],
                    [gun_current],
                    [rotator_speed],
                    [gun_air_pressure],
                    [timestamp]
                FROM [dbo].[zinc_data]
                ORDER BY [id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching zinc data: ${error.message}`);
        }
    }
}

module.exports = ZincModel;