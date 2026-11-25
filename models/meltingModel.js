// const { getBdpCcmnewPool } = require("../config/sqlDb");

// class MeltingModel {
//     static async getAllMeltingData() {
//         try {
//             const pool = await getBdpCcmnewPool();
//             const result = await pool.request().query(`
//                 SELECT TOP (1000) 
//                     [id],
//                     [ladle_no],
//                     [metal_wt_gross_tare],
//                     [tap_time_ladle_wise],
//                     [mbf_metal_c_si_others],
//                     [actual_ms_scrap_charging_fce_wise],
//                     [deviation_of_ms_scrap_addition],
//                     [actual_fesi_charging_fce_wise],
//                     [deviation_of_fesi_addition],
//                     [ind_fce_metal_chemistry],
//                     [taping_temperature],
//                     [metal_weight_for_sdp],
//                     [mg_addition_requirement_calculation],
//                     [actual_mg_addition_in_converter],
//                     [deviation_of_mg_addition],
//                     [pipe_sample_c_si]
//                 FROM [dbo].[melting_data]
//             `);
//             return result.recordset;
//         } catch (error) {
//             throw new Error(`Error fetching melting data: ${error.message}`);
//         }
//     }
// }

// module.exports = MeltingModel;


const { getmeltPool } = require("../config/sqlDb");

class MeltingModel {
    static async getAllMeltingData() {
        try {
            const pool = await getmeltPool();
            const result = await pool.request().query(`
                SELECT 
                    [id],
                    [ladle_no],
                    [metal_wt_gross_tare],
                    [tap_time_ladle_wise],
                    [mbf_metal_c_si_others],
                    [actual_ms_scrap_charging_fce_wise],
                    [deviation_of_ms_scrap_addition],
                    [actual_fesi_charging_fce_wise],
                    [deviation_of_fesi_addition],
                    [ind_fce_metal_chemistry],
                    [taping_temperature],
                    [metal_weight_for_sdp],
                    [mg_addition_requirement_calculation],
                    [actual_mg_addition_in_converter],
                    [deviation_of_mg_addition],
                    [pipe_sample_c_si],
                    [timestamp]
                FROM [dbo].[melting_data]
                ORDER BY [id] DESC
            `);
            return result.recordset;
        } catch (error) {
            throw new Error(`Error fetching melting data: ${error.message}`);
        }
    }
}

module.exports = MeltingModel;