const { getBdpCcmnewPool, sql } = require("../config/sqlDb");

class Ccm03NewModel {
    // Get all records from CCM 03_new
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
                [S3_MM_Act_Cur],
                [S3_Trav_Act_Spd],
                [S3_Hop_Act_Spd],
                [S3_MM_Act_Spd],
                [S3_MPU_Act_Spd],
                [Data],
                [VariableToSample1],
                [VariableToSample2],
                [VariableToSample3],
                [VariableToSample4],
                [VariableToSample5],
                [VariableToSample6],
                [VariableToSample7],
                [VariableToSample8],
                [HMI_JRKDLY_PRNG_SPD2],
                [HMI_JRKDLY_PRNG_SPD1],
                [HMI_JRKMTL_PRNG_SPD1],
                [HMI_JRKMTL_PRNG_SPD2],
                [PRE],
                [PRE1],
                [PRE2],
                [PRE3],
                [PRE4],
                [PRE5],
                [PRE6],
                [PRE7],
                [PRE8],
                [PRE9],
                [TRAV_UP_SPD],
                [Pipe_Count],
                [Pipe_Size],
                [Trav_Spd1],
                [Trav_Spd2],
                [Trav_Spd3],
                [Hop_Jrk_Spd],
                [Hop_Spd1],
                [Hop_Spd2],
                [Hop_Spd3],
                [Hop_Spd4],
                [MM_Skt_Spd],
                [MM_Brl_Spd],
                [MM_Spgt_Spd],
                [MM_Pull_Spd],
                [MPU_Skt_Spd],
                [MPU_Brl_Spd],
                [MPU_Spgt_Spd],
                [MPU_Up_Spd],
                [Inc_On_Dly],
                [Inc_Off_Dly],
                [Water_In_Temp],
                [Water_Out_Temp],
                [Water_Flow],
                [HOT_METAL_TEMPERATURE],
                [INC_FLOW_SET_VALUE],
                [Metal_Sensor2_Log],
                [Metal_Sensor1_Log],
                [MP_AGITR_MOTOR_ON_CMD],
                [MPU_AIR_PRESSURE_LEFT],
                [MPU_AIR_PRESSURE_RIGHT],
                [Pipe_Weight_Display_HMI],
                [SPM3_MPU_RTD_TEMP_OUT]
            FROM [BDP_CCM_NEW].[dbo].[CCM 03_new]
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
                    [S3_MM_Act_Cur],
                    [S3_Trav_Act_Spd],
                    [S3_Hop_Act_Spd],
                    [S3_MM_Act_Spd],
                    [S3_MPU_Act_Spd],
                    [Data],
                    [VariableToSample1],
                    [VariableToSample2],
                    [VariableToSample3],
                    [VariableToSample4],
                    [VariableToSample5],
                    [VariableToSample6],
                    [VariableToSample7],
                    [VariableToSample8],
                    [HMI_JRKDLY_PRNG_SPD2],
                    [HMI_JRKDLY_PRNG_SPD1],
                    [HMI_JRKMTL_PRNG_SPD1],
                    [HMI_JRKMTL_PRNG_SPD2],
                    [PRE],
                    [PRE1],
                    [PRE2],
                    [PRE3],
                    [PRE4],
                    [PRE5],
                    [PRE6],
                    [PRE7],
                    [PRE8],
                    [PRE9],
                    [TRAV_UP_SPD],
                    [Pipe_Count],
                    [Pipe_Size],
                    [Trav_Spd1],
                    [Trav_Spd2],
                    [Trav_Spd3],
                    [Hop_Jrk_Spd],
                    [Hop_Spd1],
                    [Hop_Spd2],
                    [Hop_Spd3],
                    [Hop_Spd4],
                    [MM_Skt_Spd],
                    [MM_Brl_Spd],
                    [MM_Spgt_Spd],
                    [MM_Pull_Spd],
                    [MPU_Skt_Spd],
                    [MPU_Brl_Spd],
                    [MPU_Spgt_Spd],
                    [MPU_Up_Spd],
                    [Inc_On_Dly],
                    [Inc_Off_Dly],
                    [Water_In_Temp],
                    [Water_Out_Temp],
                    [Water_Flow],
                    [HOT_METAL_TEMPERATURE],
                    [INC_FLOW_SET_VALUE],
                    [Metal_Sensor2_Log],
                    [Metal_Sensor1_Log],
                    [MP_AGITR_MOTOR_ON_CMD],
                    [MPU_AIR_PRESSURE_LEFT],
                    [MPU_AIR_PRESSURE_RIGHT],
                    [Pipe_Weight_Display_HMI],
                    [SPM3_MPU_RTD_TEMP_OUT]
                FROM [BDP_CCM_NEW].[dbo].[CCM 03_new]
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
            .input("S3_MM_Act_Cur", sql.Float, data.S3_MM_Act_Cur)
            .input("S3_Trav_Act_Spd", sql.Float, data.S3_Trav_Act_Spd)
            .input("S3_Hop_Act_Spd", sql.Float, data.S3_Hop_Act_Spd)
            .input("S3_MM_Act_Spd", sql.Float, data.S3_MM_Act_Spd)
            .input("S3_MPU_Act_Spd", sql.Float, data.S3_MPU_Act_Spd)
            .input("Data", sql.VarChar, data.Data)
            .input("VariableToSample1", sql.Float, data.VariableToSample1)
            .input("VariableToSample2", sql.Float, data.VariableToSample2)
            .input("VariableToSample3", sql.Float, data.VariableToSample3)
            .input("VariableToSample4", sql.Float, data.VariableToSample4)
            .input("VariableToSample5", sql.Float, data.VariableToSample5)
            .input("VariableToSample6", sql.Float, data.VariableToSample6)
            .input("VariableToSample7", sql.Float, data.VariableToSample7)
            .input("VariableToSample8", sql.Float, data.VariableToSample8)
            .input("HMI_JRKDLY_PRNG_SPD2", sql.Float, data.HMI_JRKDLY_PRNG_SPD2)
            .input("HMI_JRKDLY_PRNG_SPD1", sql.Float, data.HMI_JRKDLY_PRNG_SPD1)
            .input("HMI_JRKMTL_PRNG_SPD1", sql.Float, data.HMI_JRKMTL_PRNG_SPD1)
            .input("HMI_JRKMTL_PRNG_SPD2", sql.Float, data.HMI_JRKMTL_PRNG_SPD2)
            .input("PRE", sql.Float, data.PRE)
            .input("PRE1", sql.Float, data.PRE1)
            .input("PRE2", sql.Float, data.PRE2)
            .input("PRE3", sql.Float, data.PRE3)
            .input("PRE4", sql.Float, data.PRE4)
            .input("PRE5", sql.Float, data.PRE5)
            .input("PRE6", sql.Float, data.PRE6)
            .input("PRE7", sql.Float, data.PRE7)
            .input("PRE8", sql.Float, data.PRE8)
            .input("PRE9", sql.Float, data.PRE9)
            .input("TRAV_UP_SPD", sql.Float, data.TRAV_UP_SPD)
            .input("Pipe_Count", sql.Int, data.Pipe_Count)
            .input("Pipe_Size", sql.Float, data.Pipe_Size)
            .input("Trav_Spd1", sql.Float, data.Trav_Spd1)
            .input("Trav_Spd2", sql.Float, data.Trav_Spd2)
            .input("Trav_Spd3", sql.Float, data.Trav_Spd3)
            .input("Hop_Jrk_Spd", sql.Float, data.Hop_Jrk_Spd)
            .input("Hop_Spd1", sql.Float, data.Hop_Spd1)
            .input("Hop_Spd2", sql.Float, data.Hop_Spd2)
            .input("Hop_Spd3", sql.Float, data.Hop_Spd3)
            .input("Hop_Spd4", sql.Float, data.Hop_Spd4)
            .input("MM_Skt_Spd", sql.Float, data.MM_Skt_Spd)
            .input("MM_Brl_Spd", sql.Float, data.MM_Brl_Spd)
            .input("MM_Spgt_Spd", sql.Float, data.MM_Spgt_Spd)
            .input("MM_Pull_Spd", sql.Float, data.MM_Pull_Spd)
            .input("MPU_Skt_Spd", sql.Float, data.MPU_Skt_Spd)
            .input("MPU_Brl_Spd", sql.Float, data.MPU_Brl_Spd)
            .input("MPU_Spgt_Spd", sql.Float, data.MPU_Spgt_Spd)
            .input("MPU_Up_Spd", sql.Float, data.MPU_Up_Spd)
            .input("Inc_On_Dly", sql.Float, data.Inc_On_Dly)
            .input("Inc_Off_Dly", sql.Float, data.Inc_Off_Dly)
            .input("Water_In_Temp", sql.Float, data.Water_In_Temp)
            .input("Water_Out_Temp", sql.Float, data.Water_Out_Temp)
            .input("Water_Flow", sql.Float, data.Water_Flow)
            .input("HOT_METAL_TEMPERATURE", sql.Float, data.HOT_METAL_TEMPERATURE)
            .input("INC_FLOW_SET_VALUE", sql.Float, data.INC_FLOW_SET_VALUE)
            .input("Metal_Sensor2_Log", sql.Float, data.Metal_Sensor2_Log)
            .input("Metal_Sensor1_Log", sql.Float, data.Metal_Sensor1_Log)
            .input("MP_AGITR_MOTOR_ON_CMD", sql.Bit, data.MP_AGITR_MOTOR_ON_CMD)
            .input("MPU_AIR_PRESSURE_LEFT", sql.Float, data.MPU_AIR_PRESSURE_LEFT)
            .input("MPU_AIR_PRESSURE_RIGHT", sql.Float, data.MPU_AIR_PRESSURE_RIGHT)
            .input("Pipe_Weight_Display_HMI", sql.Float, data.Pipe_Weight_Display_HMI)
            .input("SPM3_MPU_RTD_TEMP_OUT", sql.Float, data.SPM3_MPU_RTD_TEMP_OUT)
            .query(`
                INSERT INTO [BDP_CCM_NEW].[dbo].[CCM 03_new] (
                    [Timestamp], [LocalTimestamp], [Trav_Up], [Trav_Dwn], [Hop_Up], [MPU_Rt_On], [MPU_Lt_On], 
                    [MPU_On_Dur], [Inc_On_Dur], [S3_MM_Act_Cur], [S3_Trav_Act_Spd], [S3_Hop_Act_Spd], [S3_MM_Act_Spd], [S3_MPU_Act_Spd], 
                    [Data], [VariableToSample1], [VariableToSample2], [VariableToSample3], [VariableToSample4], [VariableToSample5], [VariableToSample6], [VariableToSample7], [VariableToSample8], 
                    [HMI_JRKDLY_PRNG_SPD2], [HMI_JRKDLY_PRNG_SPD1], [HMI_JRKMTL_PRNG_SPD1], [HMI_JRKMTL_PRNG_SPD2], 
                    [PRE], [PRE1], [PRE2], [PRE3], [PRE4], [PRE5], [PRE6], [PRE7], [PRE8], [PRE9], [TRAV_UP_SPD], 
                    [Pipe_Count], [Pipe_Size], [Trav_Spd1], [Trav_Spd2], [Trav_Spd3], [Hop_Jrk_Spd], [Hop_Spd1], [Hop_Spd2], [Hop_Spd3], [Hop_Spd4], 
                    [MM_Skt_Spd], [MM_Brl_Spd], [MM_Spgt_Spd], [MM_Pull_Spd], [MPU_Skt_Spd], [MPU_Brl_Spd], [MPU_Spgt_Spd], [MPU_Up_Spd], 
                    [Inc_On_Dly], [Inc_Off_Dly], [Water_In_Temp], [Water_Out_Temp], [Water_Flow], 
                    [HOT_METAL_TEMPERATURE], [INC_FLOW_SET_VALUE], [Metal_Sensor2_Log], [Metal_Sensor1_Log], 
                    [MP_AGITR_MOTOR_ON_CMD], [MPU_AIR_PRESSURE_LEFT], [MPU_AIR_PRESSURE_RIGHT], [Pipe_Weight_Display_HMI], [SPM3_MPU_RTD_TEMP_OUT]
                )
                OUTPUT INSERTED.*
                VALUES (
                    @Timestamp, @LocalTimestamp, @Trav_Up, @Trav_Dwn, @Hop_Up, @MPU_Rt_On, @MPU_Lt_On, 
                    @MPU_On_Dur, @Inc_On_Dur, @S3_MM_Act_Cur, @S3_Trav_Act_Spd, @S3_Hop_Act_Spd, @S3_MM_Act_Spd, @S3_MPU_Act_Spd, 
                    @Data, @VariableToSample1, @VariableToSample2, @VariableToSample3, @VariableToSample4, @VariableToSample5, @VariableToSample6, @VariableToSample7, @VariableToSample8, 
                    @HMI_JRKDLY_PRNG_SPD2, @HMI_JRKDLY_PRNG_SPD1, @HMI_JRKMTL_PRNG_SPD1, @HMI_JRKMTL_PRNG_SPD2, 
                    @PRE, @PRE1, @PRE2, @PRE3, @PRE4, @PRE5, @PRE6, @PRE7, @PRE8, @PRE9, @TRAV_UP_SPD, 
                    @Pipe_Count, @Pipe_Size, @Trav_Spd1, @Trav_Spd2, @Trav_Spd3, @Hop_Jrk_Spd, @Hop_Spd1, @Hop_Spd2, @Hop_Spd3, @Hop_Spd4, 
                    @MM_Skt_Spd, @MM_Brl_Spd, @MM_Spgt_Spd, @MM_Pull_Spd, @MPU_Skt_Spd, @MPU_Brl_Spd, @MPU_Spgt_Spd, @MPU_Up_Spd, 
                    @Inc_On_Dly, @Inc_Off_Dly, @Water_In_Temp, @Water_Out_Temp, @Water_Flow, 
                    @HOT_METAL_TEMPERATURE, @INC_FLOW_SET_VALUE, @Metal_Sensor2_Log, @Metal_Sensor1_Log, 
                    @MP_AGITR_MOTOR_ON_CMD, @MPU_AIR_PRESSURE_LEFT, @MPU_AIR_PRESSURE_RIGHT, @Pipe_Weight_Display_HMI, @SPM3_MPU_RTD_TEMP_OUT
                )
            `);
        return result.recordset[0];
    }

    // Update record by Id
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
            .input("S3_MM_Act_Cur", sql.Float, data.S3_MM_Act_Cur)
            .input("S3_Trav_Act_Spd", sql.Float, data.S3_Trav_Act_Spd)
            .input("S3_Hop_Act_Spd", sql.Float, data.S3_Hop_Act_Spd)
            .input("S3_MM_Act_Spd", sql.Float, data.S3_MM_Act_Spd)
            .input("S3_MPU_Act_Spd", sql.Float, data.S3_MPU_Act_Spd)
            .input("Data", sql.VarChar, data.Data)
            .input("VariableToSample1", sql.Float, data.VariableToSample1)
            .input("VariableToSample2", sql.Float, data.VariableToSample2)
            .input("VariableToSample3", sql.Float, data.VariableToSample3)
            .input("VariableToSample4", sql.Float, data.VariableToSample4)
            .input("VariableToSample5", sql.Float, data.VariableToSample5)
            .input("VariableToSample6", sql.Float, data.VariableToSample6)
            .input("VariableToSample7", sql.Float, data.VariableToSample7)
            .input("VariableToSample8", sql.Float, data.VariableToSample8)
            .input("HMI_JRKDLY_PRNG_SPD2", sql.Float, data.HMI_JRKDLY_PRNG_SPD2)
            .input("HMI_JRKDLY_PRNG_SPD1", sql.Float, data.HMI_JRKDLY_PRNG_SPD1)
            .input("HMI_JRKMTL_PRNG_SPD1", sql.Float, data.HMI_JRKMTL_PRNG_SPD1)
            .input("HMI_JRKMTL_PRNG_SPD2", sql.Float, data.HMI_JRKMTL_PRNG_SPD2)
            .input("PRE", sql.Float, data.PRE)
            .input("PRE1", sql.Float, data.PRE1)
            .input("PRE2", sql.Float, data.PRE2)
            .input("PRE3", sql.Float, data.PRE3)
            .input("PRE4", sql.Float, data.PRE4)
            .input("PRE5", sql.Float, data.PRE5)
            .input("PRE6", sql.Float, data.PRE6)
            .input("PRE7", sql.Float, data.PRE7)
            .input("PRE8", sql.Float, data.PRE8)
            .input("PRE9", sql.Float, data.PRE9)
            .input("TRAV_UP_SPD", sql.Float, data.TRAV_UP_SPD)
            .input("Pipe_Count", sql.Int, data.Pipe_Count)
            .input("Pipe_Size", sql.Float, data.Pipe_Size)
            .input("Trav_Spd1", sql.Float, data.Trav_Spd1)
            .input("Trav_Spd2", sql.Float, data.Trav_Spd2)
            .input("Trav_Spd3", sql.Float, data.Trav_Spd3)
            .input("Hop_Jrk_Spd", sql.Float, data.Hop_Jrk_Spd)
            .input("Hop_Spd1", sql.Float, data.Hop_Spd1)
            .input("Hop_Spd2", sql.Float, data.Hop_Spd2)
            .input("Hop_Spd3", sql.Float, data.Hop_Spd3)
            .input("Hop_Spd4", sql.Float, data.Hop_Spd4)
            .input("MM_Skt_Spd", sql.Float, data.MM_Skt_Spd)
            .input("MM_Brl_Spd", sql.Float, data.MM_Brl_Spd)
            .input("MM_Spgt_Spd", sql.Float, data.MM_Spgt_Spd)
            .input("MM_Pull_Spd", sql.Float, data.MM_Pull_Spd)
            .input("MPU_Skt_Spd", sql.Float, data.MPU_Skt_Spd)
            .input("MPU_Brl_Spd", sql.Float, data.MPU_Brl_Spd)
            .input("MPU_Spgt_Spd", sql.Float, data.MPU_Spgt_Spd)
            .input("MPU_Up_Spd", sql.Float, data.MPU_Up_Spd)
            .input("Inc_On_Dly", sql.Float, data.Inc_On_Dly)
            .input("Inc_Off_Dly", sql.Float, data.Inc_Off_Dly)
            .input("Water_In_Temp", sql.Float, data.Water_In_Temp)
            .input("Water_Out_Temp", sql.Float, data.Water_Out_Temp)
            .input("Water_Flow", sql.Float, data.Water_Flow)
            .input("HOT_METAL_TEMPERATURE", sql.Float, data.HOT_METAL_TEMPERATURE)
            .input("INC_FLOW_SET_VALUE", sql.Float, data.INC_FLOW_SET_VALUE)
            .input("Metal_Sensor2_Log", sql.Float, data.Metal_Sensor2_Log)
            .input("Metal_Sensor1_Log", sql.Float, data.Metal_Sensor1_Log)
            .input("MP_AGITR_MOTOR_ON_CMD", sql.Bit, data.MP_AGITR_MOTOR_ON_CMD)
            .input("MPU_AIR_PRESSURE_LEFT", sql.Float, data.MPU_AIR_PRESSURE_LEFT)
            .input("MPU_AIR_PRESSURE_RIGHT", sql.Float, data.MPU_AIR_PRESSURE_RIGHT)
            .input("Pipe_Weight_Display_HMI", sql.Float, data.Pipe_Weight_Display_HMI)
            .input("SPM3_MPU_RTD_TEMP_OUT", sql.Float, data.SPM3_MPU_RTD_TEMP_OUT)
            .query(`
                UPDATE [BDP_CCM_NEW].[dbo].[CCM 03_new]
                SET [Timestamp] = @Timestamp,
                    [LocalTimestamp] = @LocalTimestamp,
                    [Trav_Up] = @Trav_Up,
                    [Trav_Dwn] = @Trav_Dwn,
                    [Hop_Up] = @Hop_Up,
                    [MPU_Rt_On] = @MPU_Rt_On,
                    [MPU_Lt_On] = @MPU_Lt_On,
                    [MPU_On_Dur] = @MPU_On_Dur,
                    [Inc_On_Dur] = @Inc_On_Dur,
                    [S3_MM_Act_Cur] = @S3_MM_Act_Cur,
                    [S3_Trav_Act_Spd] = @S3_Trav_Act_Spd,
                    [S3_Hop_Act_Spd] = @S3_Hop_Act_Spd,
                    [S3_MM_Act_Spd] = @S3_MM_Act_Spd,
                    [S3_MPU_Act_Spd] = @S3_MPU_Act_Spd,
                    [Data] = @Data,
                    [VariableToSample1] = @VariableToSample1,
                    [VariableToSample2] = @VariableToSample2,
                    [VariableToSample3] = @VariableToSample3,
                    [VariableToSample4] = @VariableToSample4,
                    [VariableToSample5] = @VariableToSample5,
                    [VariableToSample6] = @VariableToSample6,
                    [VariableToSample7] = @VariableToSample7,
                    [VariableToSample8] = @VariableToSample8,
                    [HMI_JRKDLY_PRNG_SPD2] = @HMI_JRKDLY_PRNG_SPD2,
                    [HMI_JRKDLY_PRNG_SPD1] = @HMI_JRKDLY_PRNG_SPD1,
                    [HMI_JRKMTL_PRNG_SPD1] = @HMI_JRKMTL_PRNG_SPD1,
                    [HMI_JRKMTL_PRNG_SPD2] = @HMI_JRKMTL_PRNG_SPD2,
                    [PRE] = @PRE,
                    [PRE1] = @PRE1,
                    [PRE2] = @PRE2,
                    [PRE3] = @PRE3,
                    [PRE4] = @PRE4,
                    [PRE5] = @PRE5,
                    [PRE6] = @PRE6,
                    [PRE7] = @PRE7,
                    [PRE8] = @PRE8,
                    [PRE9] = @PRE9,
                    [TRAV_UP_SPD] = @TRAV_UP_SPD,
                    [Pipe_Count] = @Pipe_Count,
                    [Pipe_Size] = @Pipe_Size,
                    [Trav_Spd1] = @Trav_Spd1,
                    [Trav_Spd2] = @Trav_Spd2,
                    [Trav_Spd3] = @Trav_Spd3,
                    [Hop_Jrk_Spd] = @Hop_Jrk_Spd,
                    [Hop_Spd1] = @Hop_Spd1,
                    [Hop_Spd2] = @Hop_Spd2,
                    [Hop_Spd3] = @Hop_Spd3,
                    [Hop_Spd4] = @Hop_Spd4,
                    [MM_Skt_Spd] = @MM_Skt_Spd,
                    [MM_Brl_Spd] = @MM_Brl_Spd,
                    [MM_Spgt_Spd] = @MM_Spgt_Spd,
                    [MM_Pull_Spd] = @MM_Pull_Spd,
                    [MPU_Skt_Spd] = @MPU_Skt_Spd,
                    [MPU_Brl_Spd] = @MPU_Brl_Spd,
                    [MPU_Spgt_Spd] = @MPU_Spgt_Spd,
                    [MPU_Up_Spd] = @MPU_Up_Spd,
                    [Inc_On_Dly] = @Inc_On_Dly,
                    [Inc_Off_Dly] = @Inc_Off_Dly,
                    [Water_In_Temp] = @Water_In_Temp,
                    [Water_Out_Temp] = @Water_Out_Temp,
                    [Water_Flow] = @Water_Flow,
                    [HOT_METAL_TEMPERATURE] = @HOT_METAL_TEMPERATURE,
                    [INC_FLOW_SET_VALUE] = @INC_FLOW_SET_VALUE,
                    [Metal_Sensor2_Log] = @Metal_Sensor2_Log,
                    [Metal_Sensor1_Log] = @Metal_Sensor1_Log,
                    [MP_AGITR_MOTOR_ON_CMD] = @MP_AGITR_MOTOR_ON_CMD,
                    [MPU_AIR_PRESSURE_LEFT] = @MPU_AIR_PRESSURE_LEFT,
                    [MPU_AIR_PRESSURE_RIGHT] = @MPU_AIR_PRESSURE_RIGHT,
                    [Pipe_Weight_Display_HMI] = @Pipe_Weight_Display_HMI,
                    [SPM3_MPU_RTD_TEMP_OUT] = @SPM3_MPU_RTD_TEMP_OUT
                OUTPUT INSERTED.*
                WHERE [Id] = @Id
            `);
        return result.recordset[0];
    }

    // Delete record by Id
    static async delete(id) {
        const pool = await getBdpCcmnewPool();
        const result = await pool.request()
            .input("Id", sql.Int, id)
            .query(`
                DELETE FROM [BDP_CCM_NEW].[dbo].[CCM 03_new]
                OUTPUT DELETED.*
                WHERE [Id] = @Id
            `);
        return result.recordset[0];
    }
}

module.exports = Ccm03NewModel;