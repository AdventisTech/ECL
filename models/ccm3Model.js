// const { getBdpCcmnewPool, sql } = require("../config/sqlDb");

// class Ccm3Model {
//     // Get all records from ccm 3
//     static async getAll() {
//         const pool = await getBdpCcmnewPool();
//         const result = await pool.request().query(`
//             SELECT  TOP(1000)
//                 [Timestamp],
//                 [LocalTimestamp],
//                 [Id],
//                 [Trav_Up],
//                 [Trav_Dwn],
//                 [Hop_Up],
//                 [MPU_Rt_On],
//                 [MPU_Lt_On],
//                 [MPU_On_Dur],
//                 [Inc_On_Dur],
//                 [S2_MM_Act_Cur],
//                 [S2_Hop_Act_Spd],
//                 [S2_Trav_Act_Spd],
//                 [S2_MM_Act_Spd],
//                 [S2_MPU_Act_Spd],
//                 [Pipe_Count],
//                 [Pipe_Size],
//                 [Trav_Spd1],
//                 [Trav_Spd2],
//                 [Hop_Jrk_Spd],
//                 [Hop_Spd1],
//                 [Hop_Spd2],
//                 [Hop_Spd3],
//                 [Hop_Spd4],
//                 [MM_Skt_Spd],
//                 [MM_Brl_Spd],
//                 [MM_Spgt_Spd],
//                 [MPU_Skt_Spd],
//                 [MPU_Brl_Spd],
//                 [MPU_Spgt_Spd],
//                 [MPU_Up_Spd],
//                 [Inc_On_Dly],
//                 [Inc_Off_Dly],
//                 [Water_In_Temp],
//                 [Water_Out_Temp],
//                 [Water_Flow],
//                 [Agitator_Log],
//                 [Back_Spray_Stp_Pos_mm],
//                 [Back_Spray_Str_Pos],
//                 [Bell_Cast_Finish_Pos_mm],
//                 [Bell_Spray_Dur_Time],
//                 [Bell_Spray_Str_Pos_mm],
//                 [Bell_Water_Spray_Delay_Time],
//                 [Bell_Water_Spray_Dur_Time],
//                 [Body_Dwn_Lmt_Pos_mm],
//                 [Body_Up_Lmt_Pos_mm],
//                 [HOT_METAL_TEMPERATURE],
//                 [INC_SPEED_SET],
//                 [Ladle_Pour_Stp_Pos_mm],
//                 [Metal_Sensor1_Log],
//                 [Metal_Sensor2_Log],
//                 [MPU_AIR_PRESSURE_LEFT],
//                 [MPU_AIR_PRESSURE_RIGHT],
//                 [Powder_Start_Pos_mm],
//                 [Powder_Stop_Pos_mm],
//                 [Pulling_Spd_Pct],
//                 [Spigot_Check_Pos_L_Runner_mm],
//                 [Spigot_Check_Pos_R_Runner_mm],
//                 [pigot_Check_Time],
//                 [SPM2_MPU_HEATER],
//                 [SPM2_MPU_RTD_TEMP_Output]
//             FROM [BDP_CCM_NEW].[dbo].[ccm 3]
//         `);
//         return result.recordset;
//     }

//     // Get record by Id
//     static async getById(id) {
//         const pool = await getBdpCcmnewPool();
//         const result = await pool.request()
//             .input("Id", sql.Int, id)
//             .query(`
//                 SELECT 
//                     [Timestamp],
//                     [LocalTimestamp],
//                     [Id],
//                     [Trav_Up],
//                     [Trav_Dwn],
//                     [Hop_Up],
//                     [MPU_Rt_On],
//                     [MPU_Lt_On],
//                     [MPU_On_Dur],
//                     [Inc_On_Dur],
//                     [S2_MM_Act_Cur],
//                     [S2_Hop_Act_Spd],
//                     [S2_Trav_Act_Spd],
//                     [S2_MM_Act_Spd],
//                     [S2_MPU_Act_Spd],
//                     [Pipe_Count],
//                     [Pipe_Size],
//                     [Trav_Spd1],
//                     [Trav_Spd2],
//                     [Hop_Jrk_Spd],
//                     [Hop_Spd1],
//                     [Hop_Spd2],
//                     [Hop_Spd3],
//                     [Hop_Spd4],
//                     [MM_Skt_Spd],
//                     [MM_Brl_Spd],
//                     [MM_Spgt_Spd],
//                     [MPU_Skt_Spd],
//                     [MPU_Brl_Spd],
//                     [MPU_Spgt_Spd],
//                     [MPU_Up_Spd],
//                     [Inc_On_Dly],
//                     [Inc_Off_Dly],
//                     [Water_In_Temp],
//                     [Water_Out_Temp],
//                     [Water_Flow],
//                     [Agitator_Log],
//                     [Back_Spray_Stp_Pos_mm],
//                     [Back_Spray_Str_Pos],
//                     [Bell_Cast_Finish_Pos_mm],
//                     [Bell_Spray_Dur_Time],
//                     [Bell_Spray_Str_Pos_mm],
//                     [Bell_Water_Spray_Delay_Time],
//                     [Bell_Water_Spray_Dur_Time],
//                     [Body_Dwn_Lmt_Pos_mm],
//                     [Body_Up_Lmt_Pos_mm],
//                     [HOT_METAL_TEMPERATURE],
//                     [INC_SPEED_SET],
//                     [Ladle_Pour_Stp_Pos_mm],
//                     [Metal_Sensor1_Log],
//                     [Metal_Sensor2_Log],
//                     [MPU_AIR_PRESSURE_LEFT],
//                     [MPU_AIR_PRESSURE_RIGHT],
//                     [Powder_Start_Pos_mm],
//                     [Powder_Stop_Pos_mm],
//                     [Pulling_Spd_Pct],
//                     [Spigot_Check_Pos_L_Runner_mm],
//                     [Spigot_Check_Pos_R_Runner_mm],
//                     [pigot_Check_Time],
//                     [SPM2_MPU_HEATER],
//                     [SPM2_MPU_RTD_TEMP_Output]
//                 FROM [BDP_CCM_NEW].[dbo].[ccm 3]
//                 WHERE [Id] = @Id
//             `);
//         return result.recordset[0];
//     }

//     // Create a new record
//     static async create(data) {
//         const pool = await getBdpCcmnewPool();
//         const result = await pool.request()
//             .input("Timestamp", sql.DateTime, data.Timestamp || new Date())
//             .input("LocalTimestamp", sql.DateTime, data.LocalTimestamp)
//             .input("Trav_Up", sql.Bit, data.Trav_Up)
//             .input("Trav_Dwn", sql.Bit, data.Trav_Dwn)
//             .input("Hop_Up", sql.Bit, data.Hop_Up)
//             .input("MPU_Rt_On", sql.Bit, data.MPU_Rt_On)
//             .input("MPU_Lt_On", sql.Bit, data.MPU_Lt_On)
//             .input("MPU_On_Dur", sql.Float, data.MPU_On_Dur)
//             .input("Inc_On_Dur", sql.Float, data.Inc_On_Dur)
//             .input("S2_MM_Act_Cur", sql.Float, data.S2_MM_Act_Cur)
//             .input("S2_Hop_Act_Spd", sql.Float, data.S2_Hop_Act_Spd)
//             .input("S2_Trav_Act_Spd", sql.Float, data.S2_Trav_Act_Spd)
//             .input("S2_MM_Act_Spd", sql.Float, data.S2_MM_Act_Spd)
//             .input("S2_MPU_Act_Spd", sql.Float, data.S2_MPU_Act_Spd)
//             .input("Pipe_Count", sql.Int, data.Pipe_Count)
//             .input("Pipe_Size", sql.Float, data.Pipe_Size)
//             .input("Trav_Spd1", sql.Float, data.Trav_Spd1)
//             .input("Trav_Spd2", sql.Float, data.Trav_Spd2)
//             .input("Hop_Jrk_Spd", sql.Float, data.Hop_Jrk_Spd)
//             .input("Hop_Spd1", sql.Float, data.Hop_Spd1)
//             .input("Hop_Spd2", sql.Float, data.Hop_Spd2)
//             .input("Hop_Spd3", sql.Float, data.Hop_Spd3)
//             .input("Hop_Spd4", sql.Float, data.Hop_Spd4)
//             .input("MM_Skt_Spd", sql.Float, data.MM_Skt_Spd)
//             .input("MM_Brl_Spd", sql.Float, data.MM_Brl_Spd)
//             .input("MM_Spgt_Spd", sql.Float, data.MM_Spgt_Spd)
//             .input("MPU_Skt_Spd", sql.Float, data.MPU_Skt_Spd)
//             .input("MPU_Brl_Spd", sql.Float, data.MPU_Brl_Spd)
//             .input("MPU_Spgt_Spd", sql.Float, data.MPU_Spgt_Spd)
//             .input("MPU_Up_Spd", sql.Float, data.MPU_Up_Spd)
//             .input("Inc_On_Dly", sql.Float, data.Inc_On_Dly)
//             .input("Inc_Off_Dly", sql.Float, data.Inc_Off_Dly)
//             .input("Water_In_Temp", sql.Float, data.Water_In_Temp)
//             .input("Water_Out_Temp", sql.Float, data.Water_Out_Temp)
//             .input("Water_Flow", sql.Float, data.Water_Flow)
//             .input("Agitator_Log", sql.Float, data.Agitator_Log)
//             .input("Back_Spray_Stp_Pos_mm", sql.Float, data.Back_Spray_Stp_Pos_mm)
//             .input("Back_Spray_Str_Pos", sql.Float, data.Back_Spray_Str_Pos)
//             .input("Bell_Cast_Finish_Pos_mm", sql.Float, data.Bell_Cast_Finish_Pos_mm)
//             .input("Bell_Spray_Dur_Time", sql.Float, data.Bell_Spray_Dur_Time)
//             .input("Bell_Spray_Str_Pos_mm", sql.Float, data.Bell_Spray_Str_Pos_mm)
//             .input("Bell_Water_Spray_Delay_Time", sql.Float, data.Bell_Water_Spray_Delay_Time)
//             .input("Bell_Water_Spray_Dur_Time", sql.Float, data.Bell_Water_Spray_Dur_Time)
//             .input("Body_Dwn_Lmt_Pos_mm", sql.Float, data.Body_Dwn_Lmt_Pos_mm)
//             .input("Body_Up_Lmt_Pos_mm", sql.Float, data.Body_Up_Lmt_Pos_mm)
//             .input("HOT_METAL_TEMPERATURE", sql.Float, data.HOT_METAL_TEMPERATURE)
//             .input("INC_SPEED_SET", sql.Float, data.INC_SPEED_SET)
//             .input("Ladle_Pour_Stp_Pos_mm", sql.Float, data.Ladle_Pour_Stp_Pos_mm)
//             .input("Metal_Sensor1_Log", sql.Float, data.Metal_Sensor1_Log)
//             .input("Metal_Sensor2_Log", sql.Float, data.Metal_Sensor2_Log)
//             .input("MPU_AIR_PRESSURE_LEFT", sql.Float, data.MPU_AIR_PRESSURE_LEFT)
//             .input("MPU_AIR_PRESSURE_RIGHT", sql.Float, data.MPU_AIR_PRESSURE_RIGHT)
//             .input("Powder_Start_Pos_mm", sql.Float, data.Powder_Start_Pos_mm)
//             .input("Powder_Stop_Pos_mm", sql.Float, data.Powder_Stop_Pos_mm)
//             .input("Pulling_Spd_Pct", sql.Float, data.Pulling_Spd_Pct)
//             .input("Spigot_Check_Pos_L_Runner_mm", sql.Float, data.Spigot_Check_Pos_L_Runner_mm)
//             .input("Spigot_Check_Pos_R_Runner_mm", sql.Float, data.Spigot_Check_Pos_R_Runner_mm)
//             .input("pigot_Check_Time", sql.Float, data.pigot_Check_Time)
//             .input("SPM2_MPU_HEATER", sql.Float, data.SPM2_MPU_HEATER)
//             .input("SPM2_MPU_RTD_TEMP_Output", sql.Float, data.SPM2_MPU_RTD_TEMP_Output)
//             .query(`
//                 INSERT INTO [BDP_CCM_NEW].[dbo].[ccm 3] (
//                     [Timestamp], [LocalTimestamp], [Trav_Up], [Trav_Dwn], [Hop_Up], [MPU_Rt_On], [MPU_Lt_On], 
//                     [MPU_On_Dur], [Inc_On_Dur], [S2_MM_Act_Cur], [S2_Hop_Act_Spd], [S2_Trav_Act_Spd], 
//                     [S2_MM_Act_Spd], [S2_MPU_Act_Spd], [Pipe_Count], [Pipe_Size], [Trav_Spd1], [Trav_Spd2], 
//                     [Hop_Jrk_Spd], [Hop_Spd1], [Hop_Spd2], [Hop_Spd3], [Hop_Spd4], [MM_Skt_Spd], [MM_Brl_Spd], 
//                     [MM_Spgt_Spd], [MPU_Skt_Spd], [MPU_Brl_Spd], [MPU_Spgt_Spd], [MPU_Up_Spd], [Inc_On_Dly], 
//                     [Inc_Off_Dly], [Water_In_Temp], [Water_Out_Temp], [Water_Flow], [Agitator_Log], 
//                     [Back_Spray_Stp_Pos_mm], [Back_Spray_Str_Pos], [Bell_Cast_Finish_Pos_mm], 
//                     [Bell_Spray_Dur_Time], [Bell_Spray_Str_Pos_mm], [Bell_Water_Spray_Delay_Time], 
//                     [Bell_Water_Spray_Dur_Time], [Body_Dwn_Lmt_Pos_mm], [Body_Up_Lmt_Pos_mm], 
//                     [HOT_METAL_TEMPERATURE], [INC_SPEED_SET], [Ladle_Pour_Stp_Pos_mm], 
//                     [Metal_Sensor1_Log], [Metal_Sensor2_Log], [MPU_AIR_PRESSURE_LEFT], 
//                     [MPU_AIR_PRESSURE_RIGHT], [Powder_Start_Pos_mm], [Powder_Stop_Pos_mm], 
//                     [Pulling_Spd_Pct], [Spigot_Check_Pos_L_Runner_mm], [Spigot_Check_Pos_R_Runner_mm], 
//                     [pigot_Check_Time], [SPM2_MPU_HEATER], [SPM2_MPU_RTD_TEMP_Output]
//                 )
//                 OUTPUT INSERTED.*
//                 VALUES (
//                     @Timestamp, @LocalTimestamp, @Trav_Up, @Trav_Dwn, @Hop_Up, @MPU_Rt_On, @MPU_Lt_On, 
//                     @MPU_On_Dur, @Inc_On_Dur, @S2_MM_Act_Cur, @S2_Hop_Act_Spd, @S2_Trav_Act_Spd, 
//                     @S2_MM_Act_Spd, @S2_MPU_Act_Spd, @Pipe_Count, @Pipe_Size, @Trav_Spd1, @Trav_Spd2, 
//                     @Hop_Jrk_Spd, @Hop_Spd1, @Hop_Spd2, @Hop_Spd3, @Hop_Spd4, @MM_Skt_Spd, @MM_Brl_Spd, 
//                     @MM_Spgt_Spd, @MPU_Skt_Spd, @MPU_Brl_Spd, @MPU_Spgt_Spd, @MPU_Up_Spd, @Inc_On_Dly, 
//                     @Inc_Off_Dly, @Water_In_Temp, @Water_Out_Temp, @Water_Flow, @Agitator_Log, 
//                     @Back_Spray_Stp_Pos_mm, @Back_Spray_Str_Pos, @Bell_Cast_Finish_Pos_mm, 
//                     @Bell_Spray_Dur_Time, @Bell_Spray_Str_Pos_mm, @Bell_Water_Spray_Delay_Time, 
//                     @Bell_Water_Spray_Dur_Time, @Body_Dwn_Lmt_Pos_mm, @Body_Up_Lmt_Pos_mm, 
//                     @HOT_METAL_TEMPERATURE, @INC_SPEED_SET, @Ladle_Pour_Stp_Pos_mm, 
//                     @Metal_Sensor1_Log, @Metal_Sensor2_Log, @MPU_AIR_PRESSURE_LEFT, 
//                     @MPU_AIR_PRESSURE_RIGHT, @Powder_Start_Pos_mm, @Powder_Stop_Pos_mm, 
//                     @Pulling_Spd_Pct, @Spigot_Check_Pos_L_Runner_mm, @Spigot_Check_Pos_R_Runner_mm, 
//                     @pigot_Check_Time, @SPM2_MPU_HEATER, @SPM2_MPU_RTD_TEMP_Output
//                 )
//             `);
//         return result.recordset[0];
//     }

//     // Update a record by Id
//     static async update(id, data) {
//         const pool = await getBdpCcmnewPool();
//         const result = await pool.request()
//             .input("Id", sql.Int, id)
//             .input("Timestamp", sql.DateTime, data.Timestamp)
//             .input("LocalTimestamp", sql.DateTime, data.LocalTimestamp)
//             .input("Trav_Up", sql.Bit, data.Trav_Up)
//             .input("Trav_Dwn", sql.Bit, data.Trav_Dwn)
//             .input("Hop_Up", sql.Bit, data.Hop_Up)
//             .input("MPU_Rt_On", sql.Bit, data.MPU_Rt_On)
//             .input("MPU_Lt_On", sql.Bit, data.MPU_Lt_On)
//             .input("MPU_On_Dur", sql.Float, data.MPU_On_Dur)
//             .input("Inc_On_Dur", sql.Float, data.Inc_On_Dur)
//             .input("S2_MM_Act_Cur", sql.Float, data.S2_MM_Act_Cur)
//             .input("S2_Hop_Act_Spd", sql.Float, data.S2_Hop_Act_Spd)
//             .input("S2_Trav_Act_Spd", sql.Float, data.S2_Trav_Act_Spd)
//             .input("S2_MM_Act_Spd", sql.Float, data.S2_MM_Act_Spd)
//             .input("S2_MPU_Act_Spd", sql.Float, data.S2_MPU_Act_Spd)
//             .input("Pipe_Count", sql.Int, data.Pipe_Count)
//             .input("Pipe_Size", sql.Float, data.Pipe_Size)
//             .input("Trav_Spd1", sql.Float, data.Trav_Spd1)
//             .input("Trav_Spd2", sql.Float, data.Trav_Spd2)
//             .input("Hop_Jrk_Spd", sql.Float, data.Hop_Jrk_Spd)
//             .input("Hop_Spd1", sql.Float, data.Hop_Spd1)
//             .input("Hop_Spd2", sql.Float, data.Hop_Spd2)
//             .input("Hop_Spd3", sql.Float, data.Hop_Spd3)
//             .input("Hop_Spd4", sql.Float, data.Hop_Spd4)
//             .input("MM_Skt_Spd", sql.Float, data.MM_Skt_Spd)
//             .input("MM_Brl_Spd", sql.Float, data.MM_Brl_Spd)
//             .input("MM_Spgt_Spd", sql.Float, data.MM_Spgt_Spd)
//             .input("MPU_Skt_Spd", sql.Float, data.MPU_Skt_Spd)
//             .input("MPU_Brl_Spd", sql.Float, data.MPU_Brl_Spd)
//             .input("MPU_Spgt_Spd", sql.Float, data.MPU_Spgt_Spd)
//             .input("MPU_Up_Spd", sql.Float, data.MPU_Up_Spd)
//             .input("Inc_On_Dly", sql.Float, data.Inc_On_Dly)
//             .input("Inc_Off_Dly", sql.Float, data.Inc_Off_Dly)
//             .input("Water_In_Temp", sql.Float, data.Water_In_Temp)
//             .input("Water_Out_Temp", sql.Float, data.Water_Out_Temp)
//             .input("Water_Flow", sql.Float, data.Water_Flow)
//             .input("Agitator_Log", sql.Float, data.Agitator_Log)
//             .input("Back_Spray_Stp_Pos_mm", sql.Float, data.Back_Spray_Stp_Pos_mm)
//             .input("Back_Spray_Str_Pos", sql.Float, data.Back_Spray_Str_Pos)
//             .input("Bell_Cast_Finish_Pos_mm", sql.Float, data.Bell_Cast_Finish_Pos_mm)
//             .input("Bell_Spray_Dur_Time", sql.Float, data.Bell_Spray_Dur_Time)
//             .input("Bell_Spray_Str_Pos_mm", sql.Float, data.Bell_Spray_Str_Pos_mm)
//             .input("Bell_Water_Spray_Delay_Time", sql.Float, data.Bell_Water_Spray_Delay_Time)
//             .input("Bell_Water_Spray_Dur_Time", sql.Float, data.Bell_Water_Spray_Dur_Time)
//             .input("Body_Dwn_Lmt_Pos_mm", sql.Float, data.Body_Dwn_Lmt_Pos_mm)
//             .input("Body_Up_Lmt_Pos_mm", sql.Float, data.Body_Up_Lmt_Pos_mm)
//             .input("HOT_METAL_TEMPERATURE", sql.Float, data.HOT_METAL_TEMPERATURE)
//             .input("INC_SPEED_SET", sql.Float, data.INC_SPEED_SET)
//             .input("Ladle_Pour_Stp_Pos_mm", sql.Float, data.Ladle_Pour_Stp_Pos_mm)
//             .input("Metal_Sensor1_Log", sql.Float, data.Metal_Sensor1_Log)
//             .input("Metal_Sensor2_Log", sql.Float, data.Metal_Sensor2_Log)
//             .input("MPU_AIR_PRESSURE_LEFT", sql.Float, data.MPU_AIR_PRESSURE_LEFT)
//             .input("MPU_AIR_PRESSURE_RIGHT", sql.Float, data.MPU_AIR_PRESSURE_RIGHT)
//             .input("Powder_Start_Pos_mm", sql.Float, data.Powder_Start_Pos_mm)
//             .input("Powder_Stop_Pos_mm", sql.Float, data.Powder_Stop_Pos_mm)
//             .input("Pulling_Spd_Pct", sql.Float, data.Pulling_Spd_Pct)
//             .input("Spigot_Check_Pos_L_Runner_mm", sql.Float, data.Spigot_Check_Pos_L_Runner_mm)
//             .input("Spigot_Check_Pos_R_Runner_mm", sql.Float, data.Spigot_Check_Pos_R_Runner_mm)
//             .input("pigot_Check_Time", sql.Float, data.pigot_Check_Time)
//             .input("SPM2_MPU_HEATER", sql.Float, data.SPM2_MPU_HEATER)
//             .input("SPM2_MPU_RTD_TEMP_Output", sql.Float, data.SPM2_MPU_RTD_TEMP_Output)
//             .query(`
//                 UPDATE [BDP_CCM_NEW].[dbo].[ccm 3]
//                 SET [Timestamp] = @Timestamp,
//                     [LocalTimestamp] = @LocalTimestamp,
//                     [Trav_Up] = @Trav_Up,
//                     [Trav_Dwn] = @Trav_Dwn,
//                     [Hop_Up] = @Hop_Up,
//                     [MPU_Rt_On] = @MPU_Rt_On,
//                     [MPU_Lt_On] = @MPU_Lt_On,
//                     [MPU_On_Dur] = @MPU_On_Dur,
//                     [Inc_On_Dur] = @Inc_On_Dur,
//                     [S2_MM_Act_Cur] = @S2_MM_Act_Cur,
//                     [S2_Hop_Act_Spd] = @S2_Hop_Act_Spd,
//                     [S2_Trav_Act_Spd] = @S2_Trav_Act_Spd,
//                     [S2_MM_Act_Spd] = @S2_MM_Act_Spd,
//                     [S2_MPU_Act_Spd] = @S2_MPU_Act_Spd,
//                     [Pipe_Count] = @Pipe_Count,
//                     [Pipe_Size] = @Pipe_Size,
//                     [Trav_Spd1] = @Trav_Spd1,
//                     [Trav_Spd2] = @Trav_Spd2,
//                     [Hop_Jrk_Spd] = @Hop_Jrk_Spd,
//                     [Hop_Spd1] = @Hop_Spd1,
//                     [Hop_Spd2] = @Hop_Spd2,
//                     [Hop_Spd3] = @Hop_Spd3,
//                     [Hop_Spd4] = @Hop_Spd4,
//                     [MM_Skt_Spd] = @MM_Skt_Spd,
//                     [MM_Brl_Spd] = @MM_Brl_Spd,
//                     [MM_Spgt_Spd] = @MM_Spgt_Spd,
//                     [MPU_Skt_Spd] = @MPU_Skt_Spd,
//                     [MPU_Brl_Spd] = @MPU_Brl_Spd,
//                     [MPU_Spgt_Spd] = @MPU_Spgt_Spd,
//                     [MPU_Up_Spd] = @MPU_Up_Spd,
//                     [Inc_On_Dly] = @Inc_On_Dly,
//                     [Inc_Off_Dly] = @Inc_Off_Dly,
//                     [Water_In_Temp] = @Water_In_Temp,
//                     [Water_Out_Temp] = @Water_Out_Temp,
//                     [Water_Flow] = @Water_Flow,
//                     [Agitator_Log] = @Agitator_Log,
//                     [Back_Spray_Stp_Pos_mm] = @Back_Spray_Stp_Pos_mm,
//                     [Back_Spray_Str_Pos] = @Back_Spray_Str_Pos,
//                     [Bell_Cast_Finish_Pos_mm] = @Bell_Cast_Finish_Pos_mm,
//                     [Bell_Spray_Dur_Time] = @Bell_Spray_Dur_Time,
//                     [Bell_Spray_Str_Pos_mm] = @Bell_Spray_Str_Pos_mm,
//                     [Bell_Water_Spray_Delay_Time] = @Bell_Water_Spray_Delay_Time,
//                     [Bell_Water_Spray_Dur_Time] = @Bell_Water_Spray_Dur_Time,
//                     [Body_Dwn_Lmt_Pos_mm] = @Body_Dwn_Lmt_Pos_mm,
//                     [Body_Up_Lmt_Pos_mm] = @Body_Up_Lmt_Pos_mm,
//                     [HOT_METAL_TEMPERATURE] = @HOT_METAL_TEMPERATURE,
//                     [INC_SPEED_SET] = @INC_SPEED_SET,
//                     [Ladle_Pour_Stp_Pos_mm] = @Ladle_Pour_Stp_Pos_mm,
//                     [Metal_Sensor1_Log] = @Metal_Sensor1_Log,
//                     [Metal_Sensor2_Log] = @Metal_Sensor2_Log,
//                     [MPU_AIR_PRESSURE_LEFT] = @MPU_AIR_PRESSURE_LEFT,
//                     [MPU_AIR_PRESSURE_RIGHT] = @MPU_AIR_PRESSURE_RIGHT,
//                     [Powder_Start_Pos_mm] = @Powder_Start_Pos_mm,
//                     [Powder_Stop_Pos_mm] = @Powder_Stop_Pos_mm,
//                     [Pulling_Spd_Pct] = @Pulling_Spd_Pct,
//                     [Spigot_Check_Pos_L_Runner_mm] = @Spigot_Check_Pos_L_Runner_mm,
//                     [Spigot_Check_Pos_R_Runner_mm] = @Spigot_Check_Pos_R_Runner_mm,
//                     [pigot_Check_Time] = @pigot_Check_Time,
//                     [SPM2_MPU_HEATER] = @SPM2_MPU_HEATER,
//                     [SPM2_MPU_RTD_TEMP_Output] = @SPM2_MPU_RTD_TEMP_Output
//                 OUTPUT INSERTED.*
//                 WHERE [Id] = @Id
//             `);
//         return result.recordset[0];
//     }

//     // Delete a record by Id
//     static async delete(id) {
//         const pool = await getBdpCcmnewPool();
//         const result = await pool.request()
//             .input("Id", sql.Int, id)
//             .query(`
//                 DELETE FROM [BDP_CCM_NEW].[dbo].[ccm 3]
//                 OUTPUT DELETED.*
//                 WHERE [Id] = @Id
//             `);
//         return result.recordset[0];
//     }
// }

// module.exports = Ccm3Model;



const { getBdpCcmnewPool, sql } = require("../config/sqlDb");

class Ccm2Model {
    // Get all records from CCM 2
    static async getAll() {
        const pool = await getBdpCcmnewPool();
        const result = await pool.request().query(`
            SELECT 
                [Timestamp],
                [LocalTimestamp],
                [Id],
                [Trav_Up],
                [Trav_Dwn],
                [Hop_Up],
                [MPU_Rt_On],
                [MPU_Lt_On],
                [MPU_On_Dur],
                [Inc_On_Dur],
                [S2_MM_Act_Cur],
                [S2_Hop_Act_Spd],
                [S2_Trav_Act_Spd],
                [S2_MM_Act_Spd],
                [S2_MPU_Act_Spd],
                [Pipe_Count],
                [Pipe_Size],
                [Trav_Spd1],
                [Trav_Spd2],
                [Hop_Jrk_Spd],
                [Hop_Spd1],
                [Hop_Spd2],
                [Hop_Spd3],
                [Hop_Spd4],
                [MM_Skt_Spd],
                [MM_Brl_Spd],
                [MM_Spgt_Spd],
                [MPU_Skt_Spd],
                [MPU_Brl_Spd],
                [MPU_Spgt_Spd],
                [MPU_Up_Spd],
                [Inc_On_Dly],
                [Inc_Off_Dly],
                [Water_In_Temp],
                [Water_Out_Temp],
                [Water_Flow],
                [Agitator_Log],
                [Back_Spray_Stp_Pos_mm],
                [Back_Spray_Str_Pos],
                [Bell_Cast_Finish_Pos_mm],
                [Bell_Spray_Dur_Time],
                [Bell_Spray_Str_Pos_mm],
                [Bell_Water_Spray_Delay_Time],
                [Bell_Water_Spray_Dur_Time],
                [Body_Dwn_Lmt_Pos_mm],
                [Body_Up_Lmt_Pos_mm],
                [HOT_METAL_TEMPERATURE],
                [INC_SPEED_SET],
                [Ladle_Pour_Stp_Pos_mm],
                [Metal_Sensor1_Log],
                [Metal_Sensor2_Log],
                [MPU_AIR_PRESSURE_LEFT],
                [MPU_AIR_PRESSURE_RIGHT],
                [Powder_Start_Pos_mm],
                [Powder_Stop_Pos_mm],
                [Pulling_Spd_Pct],
                [Spigot_Check_Pos_L_Runner_mm],
                [Spigot_Check_Pos_R_Runner_mm],
                [pigot_Check_Time],
                [SPM2_MPU_HEATER],
                [SPM2_MPU_RTD_TEMP_Output]
            FROM [BDP_CCM_NEW].[dbo].[CCM 2]
        `);
        return result.recordset;
    }

    // Get record by Id
    static async getById(id) {
        const pool = await getBdpCcmnewPool();
        const result = await pool.request()
            .input("Id", sql.Int, id)
            .query(`
                SELECT 
                    [Timestamp],
                    [LocalTimestamp],
                    [Id],
                    [Trav_Up],
                    [Trav_Dwn],
                    [Hop_Up],
                    [MPU_Rt_On],
                    [MPU_Lt_On],
                    [MPU_On_Dur],
                    [Inc_On_Dur],
                    [S2_MM_Act_Cur],
                    [S2_Hop_Act_Spd],
                    [S2_Trav_Act_Spd],
                    [S2_MM_Act_Spd],
                    [S2_MPU_Act_Spd],
                    [Pipe_Count],
                    [Pipe_Size],
                    [Trav_Spd1],
                    [Trav_Spd2],
                    [Hop_Jrk_Spd],
                    [Hop_Spd1],
                    [Hop_Spd2],
                    [Hop_Spd3],
                    [Hop_Spd4],
                    [MM_Skt_Spd],
                    [MM_Brl_Spd],
                    [MM_Spgt_Spd],
                    [MPU_Skt_Spd],
                    [MPU_Brl_Spd],
                    [MPU_Spgt_Spd],
                    [MPU_Up_Spd],
                    [Inc_On_Dly],
                    [Inc_Off_Dly],
                    [Water_In_Temp],
                    [Water_Out_Temp],
                    [Water_Flow],
                    [Agitator_Log],
                    [Back_Spray_Stp_Pos_mm],
                    [Back_Spray_Str_Pos],
                    [Bell_Cast_Finish_Pos_mm],
                    [Bell_Spray_Dur_Time],
                    [Bell_Spray_Str_Pos_mm],
                    [Bell_Water_Spray_Delay_Time],
                    [Bell_Water_Spray_Dur_Time],
                    [Body_Dwn_Lmt_Pos_mm],
                    [Body_Up_Lmt_Pos_mm],
                    [HOT_METAL_TEMPERATURE],
                    [INC_SPEED_SET],
                    [Ladle_Pour_Stp_Pos_mm],
                    [Metal_Sensor1_Log],
                    [Metal_Sensor2_Log],
                    [MPU_AIR_PRESSURE_LEFT],
                    [MPU_AIR_PRESSURE_RIGHT],
                    [Powder_Start_Pos_mm],
                    [Powder_Stop_Pos_mm],
                    [Pulling_Spd_Pct],
                    [Spigot_Check_Pos_L_Runner_mm],
                    [Spigot_Check_Pos_R_Runner_mm],
                    [pigot_Check_Time],
                    [SPM2_MPU_HEATER],
                    [SPM2_MPU_RTD_TEMP_Output]
                FROM [BDP_CCM_NEW].[dbo].[CCM 2]
                WHERE [Id] = @Id
            `);
        return result.recordset[0];
    }

    // Create a new record
    static async create(data) {
        const pool = await getBdpCcmnewPool();
        const result = await pool.request()
            .input("Timestamp", sql.DateTime, data.Timestamp || new Date())
            .input("LocalTimestamp", sql.DateTime, data.LocalTimestamp)
            .input("Trav_Up", sql.Bit, data.Trav_Up)
            .input("Trav_Dwn", sql.Bit, data.Trav_Dwn)
            .input("Hop_Up", sql.Bit, data.Hop_Up)
            .input("MPU_Rt_On", sql.Bit, data.MPU_Rt_On)
            .input("MPU_Lt_On", sql.Bit, data.MPU_Lt_On)
            .input("MPU_On_Dur", sql.Float, data.MPU_On_Dur)
            .input("Inc_On_Dur", sql.Float, data.Inc_On_Dur)
            .input("S2_MM_Act_Cur", sql.Float, data.S2_MM_Act_Cur)
            .input("S2_Hop_Act_Spd", sql.Float, data.S2_Hop_Act_Spd)
            .input("S2_Trav_Act_Spd", sql.Float, data.S2_Trav_Act_Spd)
            .input("S2_MM_Act_Spd", sql.Float, data.S2_MM_Act_Spd)
            .input("S2_MPU_Act_Spd", sql.Float, data.S2_MPU_Act_Spd)
            .input("Pipe_Count", sql.Int, data.Pipe_Count)
            .input("Pipe_Size", sql.Float, data.Pipe_Size)
            .input("Trav_Spd1", sql.Float, data.Trav_Spd1)
            .input("Trav_Spd2", sql.Float, data.Trav_Spd2)
            .input("Hop_Jrk_Spd", sql.Float, data.Hop_Jrk_Spd)
            .input("Hop_Spd1", sql.Float, data.Hop_Spd1)
            .input("Hop_Spd2", sql.Float, data.Hop_Spd2)
            .input("Hop_Spd3", sql.Float, data.Hop_Spd3)
            .input("Hop_Spd4", sql.Float, data.Hop_Spd4)
            .input("MM_Skt_Spd", sql.Float, data.MM_Skt_Spd)
            .input("MM_Brl_Spd", sql.Float, data.MM_Brl_Spd)
            .input("MM_Spgt_Spd", sql.Float, data.MM_Spgt_Spd)
            .input("MPU_Skt_Spd", sql.Float, data.MPU_Skt_Spd)
            .input("MPU_Brl_Spd", sql.Float, data.MPU_Brl_Spd)
            .input("MPU_Spgt_Spd", sql.Float, data.MPU_Spgt_Spd)
            .input("MPU_Up_Spd", sql.Float, data.MPU_Up_Spd)
            .input("Inc_On_Dly", sql.Float, data.Inc_On_Dly)
            .input("Inc_Off_Dly", sql.Float, data.Inc_Off_Dly)
            .input("Water_In_Temp", sql.Float, data.Water_In_Temp)
            .input("Water_Out_Temp", sql.Float, data.Water_Out_Temp)
            .input("Water_Flow", sql.Float, data.Water_Flow)
            .input("Agitator_Log", sql.Float, data.Agitator_Log)
            .input("Back_Spray_Stp_Pos_mm", sql.Float, data.Back_Spray_Stp_Pos_mm)
            .input("Back_Spray_Str_Pos", sql.Float, data.Back_Spray_Str_Pos)
            .input("Bell_Cast_Finish_Pos_mm", sql.Float, data.Bell_Cast_Finish_Pos_mm)
            .input("Bell_Spray_Dur_Time", sql.Float, data.Bell_Spray_Dur_Time)
            .input("Bell_Spray_Str_Pos_mm", sql.Float, data.Bell_Spray_Str_Pos_mm)
            .input("Bell_Water_Spray_Delay_Time", sql.Float, data.Bell_Water_Spray_Delay_Time)
            .input("Bell_Water_Spray_Dur_Time", sql.Float, data.Bell_Water_Spray_Dur_Time)
            .input("Body_Dwn_Lmt_Pos_mm", sql.Float, data.Body_Dwn_Lmt_Pos_mm)
            .input("Body_Up_Lmt_Pos_mm", sql.Float, data.Body_Up_Lmt_Pos_mm)
            .input("HOT_METAL_TEMPERATURE", sql.Float, data.HOT_METAL_TEMPERATURE)
            .input("INC_SPEED_SET", sql.Float, data.INC_SPEED_SET)
            .input("Ladle_Pour_Stp_Pos_mm", sql.Float, data.Ladle_Pour_Stp_Pos_mm)
            .input("Metal_Sensor1_Log", sql.Float, data.Metal_Sensor1_Log)
            .input("Metal_Sensor2_Log", sql.Float, data.Metal_Sensor2_Log)
            .input("MPU_AIR_PRESSURE_LEFT", sql.Float, data.MPU_AIR_PRESSURE_LEFT)
            .input("MPU_AIR_PRESSURE_RIGHT", sql.Float, data.MPU_AIR_PRESSURE_RIGHT)
            .input("Powder_Start_Pos_mm", sql.Float, data.Powder_Start_Pos_mm)
            .input("Powder_Stop_Pos_mm", sql.Float, data.Powder_Stop_Pos_mm)
            .input("Pulling_Spd_Pct", sql.Float, data.Pulling_Spd_Pct)
            .input("Spigot_Check_Pos_L_Runner_mm", sql.Float, data.Spigot_Check_Pos_L_Runner_mm)
            .input("Spigot_Check_Pos_R_Runner_mm", sql.Float, data.Spigot_Check_Pos_R_Runner_mm)
            .input("pigot_Check_Time", sql.Float, data.pigot_Check_Time)
            .input("SPM2_MPU_HEATER", sql.Float, data.SPM2_MPU_HEATER)
            .input("SPM2_MPU_RTD_TEMP_Output", sql.Float, data.SPM2_MPU_RTD_TEMP_Output)
            .query(`
                INSERT INTO [BDP_CCM_NEW].[dbo].[CCM 2] (
                    [Timestamp], [LocalTimestamp], [Trav_Up], [Trav_Dwn], [Hop_Up], [MPU_Rt_On], [MPU_Lt_On], 
                    [MPU_On_Dur], [Inc_On_Dur], [S2_MM_Act_Cur], [S2_Hop_Act_Spd], [S2_Trav_Act_Spd], 
                    [S2_MM_Act_Spd], [S2_MPU_Act_Spd], [Pipe_Count], [Pipe_Size], [Trav_Spd1], [Trav_Spd2], 
                    [Hop_Jrk_Spd], [Hop_Spd1], [Hop_Spd2], [Hop_Spd3], [Hop_Spd4], [MM_Skt_Spd], [MM_Brl_Spd], 
                    [MM_Spgt_Spd], [MPU_Skt_Spd], [MPU_Brl_Spd], [MPU_Spgt_Spd], [MPU_Up_Spd], [Inc_On_Dly], 
                    [Inc_Off_Dly], [Water_In_Temp], [Water_Out_Temp], [Water_Flow], [Agitator_Log], 
                    [Back_Spray_Stp_Pos_mm], [Back_Spray_Str_Pos], [Bell_Cast_Finish_Pos_mm], 
                    [Bell_Spray_Dur_Time], [Bell_Spray_Str_Pos_mm], [Bell_Water_Spray_Delay_Time], 
                    [Bell_Water_Spray_Dur_Time], [Body_Dwn_Lmt_Pos_mm], [Body_Up_Lmt_Pos_mm], 
                    [HOT_METAL_TEMPERATURE], [INC_SPEED_SET], [Ladle_Pour_Stp_Pos_mm], 
                    [Metal_Sensor1_Log], [Metal_Sensor2_Log], [MPU_AIR_PRESSURE_LEFT], 
                    [MPU_AIR_PRESSURE_RIGHT], [Powder_Start_Pos_mm], [Powder_Stop_Pos_mm], 
                    [Pulling_Spd_Pct], [Spigot_Check_Pos_L_Runner_mm], [Spigot_Check_Pos_R_Runner_mm], 
                    [pigot_Check_Time], [SPM2_MPU_HEATER], [SPM2_MPU_RTD_TEMP_Output]
                )
                OUTPUT INSERTED.*
                VALUES (
                    @Timestamp, @LocalTimestamp, @Trav_Up, @Trav_Dwn, @Hop_Up, @MPU_Rt_On, @MPU_Lt_On, 
                    @MPU_On_Dur, @Inc_On_Dur, @S2_MM_Act_Cur, @S2_Hop_Act_Spd, @S2_Trav_Act_Spd, 
                    @S2_MM_Act_Spd, @S2_MPU_Act_Spd, @Pipe_Count, @Pipe_Size, @Trav_Spd1, @Trav_Spd2, 
                    @Hop_Jrk_Spd, @Hop_Spd1, @Hop_Spd2, @Hop_Spd3, @Hop_Spd4, @MM_Skt_Spd, @MM_Brl_Spd, 
                    @MM_Spgt_Spd, @MPU_Skt_Spd, @MPU_Brl_Spd, @MPU_Spgt_Spd, @MPU_Up_Spd, @Inc_On_Dly, 
                    @Inc_Off_Dly, @Water_In_Temp, @Water_Out_Temp, @Water_Flow, @Agitator_Log, 
                    @Back_Spray_Stp_Pos_mm, @Back_Spray_Str_Pos, @Bell_Cast_Finish_Pos_mm, 
                    @Bell_Spray_Dur_Time, @Bell_Spray_Str_Pos_mm, @Bell_Water_Spray_Delay_Time, 
                    @Bell_Water_Spray_Dur_Time, @Body_Dwn_Lmt_Pos_mm, @Body_Up_Lmt_Pos_mm, 
                    @HOT_METAL_TEMPERATURE, @INC_SPEED_SET, @Ladle_Pour_Stp_Pos_mm, 
                    @Metal_Sensor1_Log, @Metal_Sensor2_Log, @MPU_AIR_PRESSURE_LEFT, 
                    @MPU_AIR_PRESSURE_RIGHT, @Powder_Start_Pos_mm, @Powder_Stop_Pos_mm, 
                    @Pulling_Spd_Pct, @Spigot_Check_Pos_L_Runner_mm, @Spigot_Check_Pos_R_Runner_mm, 
                    @pigot_Check_Time, @SPM2_MPU_HEATER, @SPM2_MPU_RTD_TEMP_Output
                )
            `);
        return result.recordset[0];
    }

    // Update a record by Id
    static async update(id, data) {
        const pool = await getBdpCcmnewPool();
        const result = await pool.request()
            .input("Id", sql.Int, id)
            .input("Timestamp", sql.DateTime, data.Timestamp)
            .input("LocalTimestamp", sql.DateTime, data.LocalTimestamp)
            .input("Trav_Up", sql.Bit, data.Trav_Up)
            .input("Trav_Dwn", sql.Bit, data.Trav_Dwn)
            .input("Hop_Up", sql.Bit, data.Hop_Up)
            .input("MPU_Rt_On", sql.Bit, data.MPU_Rt_On)
            .input("MPU_Lt_On", sql.Bit, data.MPU_Lt_On)
            .input("MPU_On_Dur", sql.Float, data.MPU_On_Dur)
            .input("Inc_On_Dur", sql.Float, data.Inc_On_Dur)
            .input("S2_MM_Act_Cur", sql.Float, data.S2_MM_Act_Cur)
            .input("S2_Hop_Act_Spd", sql.Float, data.S2_Hop_Act_Spd)
            .input("S2_Trav_Act_Spd", sql.Float, data.S2_Trav_Act_Spd)
            .input("S2_MM_Act_Spd", sql.Float, data.S2_MM_Act_Spd)
            .input("S2_MPU_Act_Spd", sql.Float, data.S2_MPU_Act_Spd)
            .input("Pipe_Count", sql.Int, data.Pipe_Count)
            .input("Pipe_Size", sql.Float, data.Pipe_Size)
            .input("Trav_Spd1", sql.Float, data.Trav_Spd1)
            .input("Trav_Spd2", sql.Float, data.Trav_Spd2)
            .input("Hop_Jrk_Spd", sql.Float, data.Hop_Jrk_Spd)
            .input("Hop_Spd1", sql.Float, data.Hop_Spd1)
            .input("Hop_Spd2", sql.Float, data.Hop_Spd2)
            .input("Hop_Spd3", sql.Float, data.Hop_Spd3)
            .input("Hop_Spd4", sql.Float, data.Hop_Spd4)
            .input("MM_Skt_Spd", sql.Float, data.MM_Skt_Spd)
            .input("MM_Brl_Spd", sql.Float, data.MM_Brl_Spd)
            .input("MM_Spgt_Spd", sql.Float, data.MM_Spgt_Spd)
            .input("MPU_Skt_Spd", sql.Float, data.MPU_Skt_Spd)
            .input("MPU_Brl_Spd", sql.Float, data.MPU_Brl_Spd)
            .input("MPU_Spgt_Spd", sql.Float, data.MPU_Spgt_Spd)
            .input("MPU_Up_Spd", sql.Float, data.MPU_Up_Spd)
            .input("Inc_On_Dly", sql.Float, data.Inc_On_Dly)
            .input("Inc_Off_Dly", sql.Float, data.Inc_Off_Dly)
            .input("Water_In_Temp", sql.Float, data.Water_In_Temp)
            .input("Water_Out_Temp", sql.Float, data.Water_Out_Temp)
            .input("Water_Flow", sql.Float, data.Water_Flow)
            .input("Agitator_Log", sql.Float, data.Agitator_Log)
            .input("Back_Spray_Stp_Pos_mm", sql.Float, data.Back_Spray_Stp_Pos_mm)
            .input("Back_Spray_Str_Pos", sql.Float, data.Back_Spray_Str_Pos)
            .input("Bell_Cast_Finish_Pos_mm", sql.Float, data.Bell_Cast_Finish_Pos_mm)
            .input("Bell_Spray_Dur_Time", sql.Float, data.Bell_Spray_Dur_Time)
            .input("Bell_Spray_Str_Pos_mm", sql.Float, data.Bell_Spray_Str_Pos_mm)
            .input("Bell_Water_Spray_Delay_Time", sql.Float, data.Bell_Water_Spray_Delay_Time)
            .input("Bell_Water_Spray_Dur_Time", sql.Float, data.Bell_Water_Spray_Dur_Time)
            .input("Body_Dwn_Lmt_Pos_mm", sql.Float, data.Body_Dwn_Lmt_Pos_mm)
            .input("Body_Up_Lmt_Pos_mm", sql.Float, data.Body_Up_Lmt_Pos_mm)
            .input("HOT_METAL_TEMPERATURE", sql.Float, data.HOT_METAL_TEMPERATURE)
            .input("INC_SPEED_SET", sql.Float, data.INC_SPEED_SET)
            .input("Ladle_Pour_Stp_Pos_mm", sql.Float, data.Ladle_Pour_Stp_Pos_mm)
            .input("Metal_Sensor1_Log", sql.Float, data.Metal_Sensor1_Log)
            .input("Metal_Sensor2_Log", sql.Float, data.Metal_Sensor2_Log)
            .input("MPU_AIR_PRESSURE_LEFT", sql.Float, data.MPU_AIR_PRESSURE_LEFT)
            .input("MPU_AIR_PRESSURE_RIGHT", sql.Float, data.MPU_AIR_PRESSURE_RIGHT)
            .input("Powder_Start_Pos_mm", sql.Float, data.Powder_Start_Pos_mm)
            .input("Powder_Stop_Pos_mm", sql.Float, data.Powder_Stop_Pos_mm)
            .input("Pulling_Spd_Pct", sql.Float, data.Pulling_Spd_Pct)
            .input("Spigot_Check_Pos_L_Runner_mm", sql.Float, data.Spigot_Check_Pos_L_Runner_mm)
            .input("Spigot_Check_Pos_R_Runner_mm", sql.Float, data.Spigot_Check_Pos_R_Runner_mm)
            .input("pigot_Check_Time", sql.Float, data.pigot_Check_Time)
            .input("SPM2_MPU_HEATER", sql.Float, data.SPM2_MPU_HEATER)
            .input("SPM2_MPU_RTD_TEMP_Output", sql.Float, data.SPM2_MPU_RTD_TEMP_Output)
            .query(`
                UPDATE [BDP_CCM_NEW].[dbo].[CCM 2]
                SET [Timestamp] = @Timestamp,
                    [LocalTimestamp] = @LocalTimestamp,
                    [Trav_Up] = @Trav_Up,
                    [Trav_Dwn] = @Trav_Dwn,
                    [Hop_Up] = @Hop_Up,
                    [MPU_Rt_On] = @MPU_Rt_On,
                    [MPU_Lt_On] = @MPU_Lt_On,
                    [MPU_On_Dur] = @MPU_On_Dur,
                    [Inc_On_Dur] = @Inc_On_Dur,
                    [S2_MM_Act_Cur] = @S2_MM_Act_Cur,
                    [S2_Hop_Act_Spd] = @S2_Hop_Act_Spd,
                    [S2_Trav_Act_Spd] = @S2_Trav_Act_Spd,
                    [S2_MM_Act_Spd] = @S2_MM_Act_Spd,
                    [S2_MPU_Act_Spd] = @S2_MPU_Act_Spd,
                    [Pipe_Count] = @Pipe_Count,
                    [Pipe_Size] = @Pipe_Size,
                    [Trav_Spd1] = @Trav_Spd1,
                    [Trav_Spd2] = @Trav_Spd2,
                    [Hop_Jrk_Spd] = @Hop_Jrk_Spd,
                    [Hop_Spd1] = @Hop_Spd1,
                    [Hop_Spd2] = @Hop_Spd2,
                    [Hop_Spd3] = @Hop_Spd3,
                    [Hop_Spd4] = @Hop_Spd4,
                    [MM_Skt_Spd] = @MM_Skt_Spd,
                    [MM_Brl_Spd] = @MM_Brl_Spd,
                    [MM_Spgt_Spd] = @MM_Spgt_Spd,
                    [MPU_Skt_Spd] = @MPU_Skt_Spd,
                    [MPU_Brl_Spd] = @MPU_Brl_Spd,
                    [MPU_Spgt_Spd] = @MPU_Spgt_Spd,
                    [MPU_Up_Spd] = @MPU_Up_Spd,
                    [Inc_On_Dly] = @Inc_On_Dly,
                    [Inc_Off_Dly] = @Inc_Off_Dly,
                    [Water_In_Temp] = @Water_In_Temp,
                    [Water_Out_Temp] = @Water_Out_Temp,
                    [Water_Flow] = @Water_Flow,
                    [Agitator_Log] = @Agitator_Log,
                    [Back_Spray_Stp_Pos_mm] = @Back_Spray_Stp_Pos_mm,
                    [Back_Spray_Str_Pos] = @Back_Spray_Str_Pos,
                    [Bell_Cast_Finish_Pos_mm] = @Bell_Cast_Finish_Pos_mm,
                    [Bell_Spray_Dur_Time] = @Bell_Spray_Dur_Time,
                    [Bell_Spray_Str_Pos_mm] = @Bell_Spray_Str_Pos_mm,
                    [Bell_Water_Spray_Delay_Time] = @Bell_Water_Spray_Delay_Time,
                    [Bell_Water_Spray_Dur_Time] = @Bell_Water_Spray_Dur_Time,
                    [Body_Dwn_Lmt_Pos_mm] = @Body_Dwn_Lmt_Pos_mm,
                    [Body_Up_Lmt_Pos_mm] = @Body_Up_Lmt_Pos_mm,
                    [HOT_METAL_TEMPERATURE] = @HOT_METAL_TEMPERATURE,
                    [INC_SPEED_SET] = @INC_SPEED_SET,
                    [Ladle_Pour_Stp_Pos_mm] = @Ladle_Pour_Stp_Pos_mm,
                    [Metal_Sensor1_Log] = @Metal_Sensor1_Log,
                    [Metal_Sensor2_Log] = @Metal_Sensor2_Log,
                    [MPU_AIR_PRESSURE_LEFT] = @MPU_AIR_PRESSURE_LEFT,
                    [MPU_AIR_PRESSURE_RIGHT] = @MPU_AIR_PRESSURE_RIGHT,
                    [Powder_Start_Pos_mm] = @Powder_Start_Pos_mm,
                    [Powder_Stop_Pos_mm] = @Powder_Stop_Pos_mm,
                    [Pulling_Spd_Pct] = @Pulling_Spd_Pct,
                    [Spigot_Check_Pos_L_Runner_mm] = @Spigot_Check_Pos_L_Runner_mm,
                    [Spigot_Check_Pos_R_Runner_mm] = @Spigot_Check_Pos_R_Runner_mm,
                    [pigot_Check_Time] = @pigot_Check_Time,
                    [SPM2_MPU_HEATER] = @SPM2_MPU_HEATER,
                    [SPM2_MPU_RTD_TEMP_Output] = @SPM2_MPU_RTD_TEMP_Output
                OUTPUT INSERTED.*
                WHERE [Id] = @Id
            `);
        return result.recordset[0];
    }

    // Delete a record by Id
    static async delete(id) {
        const pool = await getBdpCcmnewPool();
        const result = await pool.request()
            .input("Id", sql.Int, id)
            .query(`
                DELETE FROM [BDP_CCM_NEW].[dbo].[CCM 2]
                OUTPUT DELETED.*
                WHERE [Id] = @Id
            `);
        return result.recordset[0];
    }
}

module.exports = Ccm2Model;