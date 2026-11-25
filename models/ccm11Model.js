const { getSdpCcmPool, sql } = require("../config/sqlDb"); // Adjust config path if needed

class Ccm11Model {
    // Get all records from CCM 11
    static async getAll() {
        const pool = await getSdpCcmPool();
        const result = await pool.request().query(`
            SELECT TOP (1000)
                [Timestamp],
                [LocalTimestamp],
                [Id],
                [Pipe_DN_Num],
                [CCM_Pouring_Socket_Position],
                [CCM_Pouring_Socket_Move_Speed],
                [CCM_Pouring_First_Straight_Position],
                [CCM_Pouring_First_Straight_Speed],
                [CCM_Pouring_Second_Straight_Position],
                [CCM_Pouring_Second_Straight_Speed],
                [CCM_Pouring_First_Spigot_Position],
                [CCM_Pouring_First_Spigot_Speed],
                [CCM_Pouring_Second_Spigot_Position_Left],
                [CCM_Pouring_Second_Spigot_Position_Right],
                [CCM_Pouring_Second_Spigot_Speed_Left],
                [CCM_Pouring_Second_Spigot_Speed_Right],
                [CCM_Pouring_Spigot_Delay_Time],
                [CCM_Pouring_Spigot_Delay_Speed],
                [CCM_Pouring_Final_Position],
                [CCM_Pouring_Final_Speed],
                [CCM_FWD_Limited_Position],
                [CCM_BCK_Limited_Position_Left],
                [CCM_BCK_Limited_Position_Right],
                [CCM_Socket_Pouring_Delay_Time],
                [Ladle_Down_CCM_Pos],
                [Mould_Motor_Low_Speed],
                [Mould_Motor_Socket_Speed],
                [Mould_Motor_Straight_Speed],
                [Mould_Motor_Spigot_Speed],
                [Mould_Motor_Cooling_Speed],
                [Mould_Motor_Cooling_Time],
                [Inoculant_Start_Delay],
                [Inoculant_Motor_Speed],
                [Inoculant_Stop_Delay],
                [Core_Turn_IN_Position],
                [Left_Powder_Start_CCM_Up_Position],
                [Left_Powder_Stop_CCM_Up_Position],
                [Right_Powder_Start_CCM_Up_Position],
                [Right_Powder_Stop_CCM_Up_Position],
                [CCM_Speed_Slow_Start_Extracting],
                [CCM_Pos_Fast_Move_Extracting],
                [CCM_Speed_Fast_Move_Extracting],
                [CCM_Pos_Slow_End_Extracting],
                [CCM_Speed_Slow_End_Extracting],
                [MPU_Socket_Speed_L],
                [MPU_First_Straight_Speed_L],
                [MPU_Second_Straight_Speed_L],
                [MPU_First_Spigot_Speed_L],
                [MPU_Second_Spigot_Speed_L],
                [MPU_Second_Spigot_Speed_R],
                [MPU_Slow_End_Extract_L],
                [MPU_Fast_Move_Extract_L],
                [MPU_Slow_Start_Extract_L],
                [MPU_Socket_Speed_R],
                [MPU_First_Straight_Speed_R],
                [MPU_Second_Straight_Speed_R],
                [MPU_First_Spigot_Speed_R],
                [MPU_Slow_End_Extract_R],
                [MPU_Fast_Move_Extract_R],
                [MPU_Slow_Start_Extract_R],
                [Left_Powder_Start_CCM_Down_Pos],
                [Left_Powder_Stop_CCM_Down_Pos],
                [Right_Powder_Start_CCM_Down_Pos],
                [Right_Powder_Stop_CCM_Down_Pos],
                [ACC],
                [Extractor_Fail_Count],
                [Ladle_fast_speed_set],
                [Ladle_middle_Speed_set],
                [PRE],
                [Ladle_normal_speed_set],
                [left_pouring_bogie_at_work_position],
                [Traverse_Down_Mode],
                [Weight_Inoculant_Consumed],
                [Weight_RMPU_ConsumedDown],
                [Weight_RMPU_ConsumedUp],
                [Weight_LMPU_ConsumedDown],
                [Weight_LMPU_ConsumedUp],
                [Pipe_Class],
                [Rec_WaterFlow],
                [Rec_TempOut],
                [Rec_SQ39],
                [Rec_SQ40],
                [right_pouring_bogie_at_work_position],
                [Log_Ladle_Fast_Time],
                [Log_Ladle_Mid_Time],
                [MetalWaitDelayTime],
                [Mold_Number],
                [Pipe_Count_M],
                [Rec_CCMDownTime],
                [Rec_CCMUpTime],
                [Rec_LadleUpTime],
                [Rec_CycleT],
                [Rec_MoldSpeed],
                [Rec_Socket_Filling_Time],
                [Spigot_Sensing_Time],
                [Sts_LadlePouringCurrent],
                [Sts_Stop],
                [Traverse_Down_By_PB],
                [Traverse_Down_By_sen]
            FROM [SDP_CCM].[dbo].[CCM 11]
        `);
        return result.recordset;
    }

    // Get record by Id
    static async getById(id) {
        const pool = await getSdpCcmPool();
        const result = await pool.request()
            .input("Id", sql.Int, id)
            .query(`
                SELECT TOP (1) *
                FROM [SDP_CCM].[dbo].[CCM 11]
                WHERE [Id] = @Id
            `);
        return result.recordset[0];
    }

    // Create a new record
    static async create(data) {
        const pool = await getSdpCcmPool();
        const result = await pool.request()
            .input("Timestamp", sql.DateTime, data.Timestamp || new Date())
            .input("LocalTimestamp", sql.DateTime, data.LocalTimestamp)
            .input("Pipe_DN_Num", sql.Float, data.Pipe_DN_Num)
            .input("CCM_Pouring_Socket_Position", sql.Float, data.CCM_Pouring_Socket_Position)
            .input("CCM_Pouring_Socket_Move_Speed", sql.Float, data.CCM_Pouring_Socket_Move_Speed)
            .input("Pipe_Class", sql.VarChar, data.Pipe_Class)
            .input("Mold_Number", sql.Int, data.Mold_Number)
            .input("Pipe_Count_M", sql.Int, data.Pipe_Count_M)
            .query(`
                INSERT INTO [SDP_CCM].[dbo].[CCM 11] (
                    [Timestamp], [LocalTimestamp], [Pipe_DN_Num], [CCM_Pouring_Socket_Position], 
                    [CCM_Pouring_Socket_Move_Speed], [Pipe_Class], [Mold_Number], [Pipe_Count_M]
                )
                OUTPUT INSERTED.*
                VALUES (
                    @Timestamp, @LocalTimestamp, @Pipe_DN_Num, @CCM_Pouring_Socket_Position, 
                    @CCM_Pouring_Socket_Move_Speed, @Pipe_Class, @Mold_Number, @Pipe_Count_M
                )
            `);
        return result.recordset[0];
    }

    // Update a record by Id
    static async update(id, data) {
        const pool = await getSdpCcmPool();
        const result = await pool.request()
            .input("Id", sql.Int, id)
            .input("Pipe_DN_Num", sql.Float, data.Pipe_DN_Num)
            .input("Pipe_Class", sql.VarChar, data.Pipe_Class)
            .input("Mold_Number", sql.Int, data.Mold_Number)
            .query(`
                UPDATE [SDP_CCM].[dbo].[CCM 11]
                SET [Pipe_DN_Num] = @Pipe_DN_Num,
                    [Pipe_Class] = @Pipe_Class,
                    [Mold_Number] = @Mold_Number
                OUTPUT INSERTED.*
                WHERE [Id] = @Id
            `);
        return result.recordset[0];
    }

    // Delete a record by Id
    static async delete(id) {
        const pool = await getSdpCcmPool();
        const result = await pool.request()
            .input("Id", sql.Int, id)
            .query(`
                DELETE FROM [SDP_CCM].[dbo].[CCM 11]
                OUTPUT DELETED.*
                WHERE [Id] = @Id
            `);
        return result.recordset[0];
    }
}

module.exports = Ccm11Model;