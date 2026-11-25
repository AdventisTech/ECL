// const { getBdpCcmnewPool } = require("../config/sqlDb");

// class SteamCuringModel {
//     static async getAllSteamCuringData() {
//         try {
//             const pool = await getBdpCcmnewPool();
//             const result = await pool.request().query(`
//                 SELECT TOP (1000) 
//                     [id],
//                     [cycle_time],
//                     [no_of_pipes],
//                     [pipe_size],
//                     [trolley_cap],
//                     [curing_time],
//                     [humidity],
//                     [chamber_temperature],
//                     [inlet_steam_ip_pressure],
//                     [inlet_steam_op_pressure]
//                 FROM [dbo].[steam_curing_data]
//             `);
//             return result.recordset;
//         } catch (error) {
//             throw new Error(`Error fetching steam curing data: ${error.message}`);
//         }
//     }
// }

// module.exports = SteamCuringModel;



const { getstreamPool } = require("../config/sqlDb");

class SteamCuringModel {
    static async getAllSteamCuringData() {
        try {
            const pool = await getstreamPool();
            const result = await pool.request().query(`
                SELECT  
                    [id],
                    [cycle_time],
                    [no_of_pipes],
                    [pipe_size],
                    [trolley_cap],
                    [curing_time],
                    [humidity],
                    [chamber_temperature],
                    [inlet_steam_ip_pressure],
                    [inlet_steam_op_pressure],
                    [timestamp]
                FROM [dbo].[steam_curing_data]
                ORDER BY [id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching steam curing data: ${error.message}`);
        }
    }
}

module.exports = SteamCuringModel;