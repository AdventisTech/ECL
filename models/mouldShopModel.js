// const { getBdpCcmnewPool } = require("../config/sqlDb");

// class MouldShopModel {
//     static async getAllMouldShopData() {
//         try {
//             const pool = await getBdpCcmnewPool();
//             const result = await pool.request().query(`
//                 SELECT TOP (1000) 
//                     [id],
//                     [peening_inlet_air_pressure],
//                     [peening_trolley_speed],
//                     [peening_mould_speed],
//                     [grinding_trolley_speed],
//                     [grinding_mould_speed]
//                 FROM [dbo].[mould_shop_data]
//             `);
//             return result.recordset;
//         } catch (error) {
//             throw new Error(`Error fetching mould shop data: ${error.message}`);
//         }
//     }
// }

// module.exports = MouldShopModel;


const { getmoldshopPool } = require("../config/sqlDb");

class MouldShopModel {
    static async getAllMouldShopData() {
        try {
            const pool = await getmoldshopPool();
            const result = await pool.request().query(`
                SELECT 
                    [id],
                    [peening_inlet_air_pressure],
                    [peening_trolley_speed],
                    [peening_mould_speed],
                    [grinding_trolley_speed],
                    [grinding_mould_speed],
                    [timestamp]
                FROM [dbo].[mould_shop_data]
                ORDER BY [id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching mould shop data: ${error.message}`);
        }
    }
}

module.exports = MouldShopModel;