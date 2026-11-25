// const sql = require("mssql");
// const { getBdpCcmPool } = require("../config/sqlDb");

// const TABLE = "CCM 04";

// async function findAll(query = {}) {
//     const pool = await getBdpCcmPool();
//     let queryStr = `SELECT * FROM ${TABLE}`;
//     const request = pool.request();
//     const conditions = [];

//     if (query.pipeCount || query.Pipe_Count) {
//         request.input("pipeCount", sql.Decimal(18, 4), query.pipeCount || query.Pipe_Count);
//         conditions.push("Pipe_Count = @pipeCount");
//     }

//     if (conditions.length > 0) {
//         queryStr += ` WHERE ${conditions.join(" AND ")}`;
//     }

//     queryStr += ` ORDER BY Id DESC`;
//     const result = await request.query(queryStr);
//     return result.recordset.map(row => wrapRowAsDocument(row));
// }

// async function findById(id) {
//     if (!id) return null;
//     const pool = await getBdpCcmPool();
//     const numericId = Number(id);
//     const request = pool.request();

//     if (Number.isInteger(numericId) && String(numericId) === String(id)) {
//         request.input("id", sql.Int, numericId);
//         const result = await request.query(`SELECT * FROM ${TABLE} WHERE Id = @id`);
//         return result.recordset[0] ? wrapRowAsDocument(result.recordset[0]) : null;
//     }           
//     return null;
// }

// async function findOne(query = {}) {
//     const pool = await getBdpCcmPool();
//     const request = pool.request();
//     let queryStr = `SELECT TOP 1 * FROM ${TABLE}`;
//     const conditions = [];

//     if (query.id || query.Id) {
//         request.input("id", sql.Int, query.id || query.Id);
//         conditions.push("Id = @id");
//     }

//     if (conditions.length > 0) {
//         queryStr += ` WHERE ${conditions.join(" AND ")}`;
//     }

//     queryStr += ` ORDER BY Id DESC`;
//     const result = await request.query(queryStr);
//     return result.recordset[0] ? wrapRowAsDocument(result.recordset[0]) : null;
// }

// async function find(query = {}) {
//     return await findAll(query);
// }

// async function countDocuments(query = {}) {
//     const pool = await getBdpCcmPool();
//     const request = pool.request();
//     let queryStr = `SELECT COUNT(*) AS total FROM ${TABLE}`;
//     const conditions = [];

//     if (query.pipeCount || query.Pipe_Count) {
//         request.input("pipeCount", sql.Decimal(18, 4), query.pipeCount || query.Pipe_Count);
//         conditions.push("Pipe_Count = @pipeCount");
//     }

//     if (conditions.length > 0) {
//         queryStr += ` WHERE ${conditions.join(" AND ")}`;
//     }

//     const result = await request.query(queryStr);
//     return result.recordset[0]?.total || 0;
// }

// async function create(data) {
//     const pool = await getBdpCcmPool();
//     const request = pool.request();

//     // Map all fields dynamically with fallback defaults
//     const fields = [
//         "Timestamp", "LocalTimestamp", "CW_Temp_In", "CW_Temp_Out", "CCM_BCK_Speed_Value",
//         "Socket_Pouring_Time", "First_Straight_Pouring_Position", "Second_Straight_Pouring_Position",
//         "First_Spigot_Pouring_Position", "Second_Spigot_Pouring_Position_Left", "Second_Spigot_Pouring_Position_Right",
//         "Spigot_Delay_Time", "Pouring_Final_Position", "CCM_FWD_Limited_Position", "CCM_BCK_Limited_Position_Left",
//         "CCM_BCK_Limited_Position_Right", "CCM_Socket_Pouring_Delay_Time", "Ladle_First_Fast_Speed",
//         "Ladle_Second_Fast_Speed", "Ladle_Third_Fast_Speed", "Ladle_First_middle_Speed", "Ladle_Second_middle_Speed",
//         "Ladle_Third_middle_Speed", "Ladle_First_Normal_Speed", "Ladle_Second_Normal_Speed", "Ladle_Third_Normal_Speed",
//         "Mould_Motor_Low_Speed", "CCM_Position_Left_Powder_Start", "CCM_Position_Left_Powder_Stop",
//         "CCM_Position_Right_Powder_Start", "CCM_Position_Right_Powder_Stop", "Socket_Powder_Start_Time",
//         "Socket_Cooling_Time", "CCM_Down_Position_Left_Powder_Start", "CCM_Down_Position_Left_Powder_Stop",
//         "CCM_Down_Position_Right_Powder_Start", "CCM_Down_Position_Right_Powder_Stop", "ladle_auto_doen_time_pre",
//         "Left_MPU_Agitator", "SPIGOT_POURING_DELAY_PRE", "Metal_Sensor_Log", "MPU_AIR_PRESSURE_RIGHT",
//         "MPU_AIR_PRESSURE_LEFT", "MPU_DLG_LEFT", "MPU_DLG_RIGHT", "Output", "CW_Temp_Skt", "CW_Temp_Trav",
//         "CW_Temp_Spgt", "CW_Flow", "CW_Pres", "CW_Valve", "Hop_Jrk_Spd", "Hop_Mid_Spd", "Hop_Norm_Spd",
//         "Hop_Up", "MM_Skt_Spd", "MM_Brl_Spd", "MM_Spgt_Spd", "MM_Final_Spd", "MM_Cool_Spd", "MM_Act_Cur",
//         "MPU_On_Dly", "MPU_Off_Dly", "MPU_Srt_Pos", "MPU_Stp_Pos", "MPU_Spd", "Pipe_Count", "SPU_On_Dly",
//         "SPU_Spd", "SPU_On_Dur", "Trav_Skt_Spd", "Trav_Brl1_Spd", "Trav_Brl2_Spd", "Trav_Spgt1_Spd",
//         "Trav_Spgt2_Spd", "Trav_Final_Spd", "Trav_Up", "Trav_Dwn", "SPMC4_DWN_TMR3", "SPMC4_DWN_TMR2",
//         "Inc_On_Dly1", "Inc_Spd1", "Inc_Stp_Pos1", "Pipe_DN_Num1"
//     ];

//     fields.forEach(f => {
//         const camelCase = f.charAt(0).toLowerCase() + f.slice(1).replace(/_([a-z])/g, g => g[1].toUpperCase());
//         const val = data[f] !== undefined ? data[f] : (data[camelCase] !== undefined ? data[camelCase] : null);
        
//         if (f.includes("Timestamp")) {
//             request.input(f, sql.DateTime2, val ? new Date(val) : null);
//         } else {
//             request.input(f, sql.Decimal(18, 4), val !== null ? Number(val) : null);
//         }
//     });

//     const columns = fields.join(", ");
//     const values = fields.map(f => `@${f}`).join(", ");

//     const result = await request.query(`
//         INSERT INTO ${TABLE} (${columns})
//         OUTPUT INSERTED.*
//         VALUES (${values})
//     `);

//     return result.recordset[0] ? wrapRowAsDocument(result.recordset[0]) : null;
// }

// async function findByIdAndUpdate(id, data) {
//     const existing = await findById(id);
//     if (!existing) return null;

//     const pool = await getBdpCcmPool();
//     const request = pool.request();
//     request.input("dbId", sql.Int, existing.id);

//     const fields = [
//         "Timestamp", "LocalTimestamp", "CW_Temp_In", "CW_Temp_Out", "CCM_BCK_Speed_Value",
//         "Socket_Pouring_Time", "First_Straight_Pouring_Position", "Second_Straight_Pouring_Position",
//         "First_Spigot_Pouring_Position", "Second_Spigot_Pouring_Position_Left", "Second_Spigot_Pouring_Position_Right",
//         "Spigot_Delay_Time", "Pouring_Final_Position", "CCM_FWD_Limited_Position", "CCM_BCK_Limited_Position_Left",
//         "CCM_BCK_Limited_Position_Right", "CCM_Socket_Pouring_Delay_Time", "Ladle_First_Fast_Speed",
//         "Ladle_Second_Fast_Speed", "Ladle_Third_Fast_Speed", "Ladle_First_middle_Speed", "Ladle_Second_middle_Speed",
//         "Ladle_Third_middle_Speed", "Ladle_First_Normal_Speed", "Ladle_Second_Normal_Speed", "Ladle_Third_Normal_Speed",
//         "Mould_Motor_Low_Speed", "CCM_Position_Left_Powder_Start", "CCM_Position_Left_Powder_Stop",
//         "CCM_Position_Right_Powder_Start", "CCM_Position_Right_Powder_Stop", "Socket_Powder_Start_Time",
//         "Socket_Cooling_Time", "CCM_Down_Position_Left_Powder_Start", "CCM_Down_Position_Left_Powder_Stop",
//         "CCM_Down_Position_Right_Powder_Start", "CCM_Down_Position_Right_Powder_Stop", "ladle_auto_doen_time_pre",
//         "Left_MPU_Agitator", "SPIGOT_POURING_DELAY_PRE", "Metal_Sensor_Log", "MPU_AIR_PRESSURE_RIGHT",
//         "MPU_AIR_PRESSURE_LEFT", "MPU_DLG_LEFT", "MPU_DLG_RIGHT", "Output", "CW_Temp_Skt", "CW_Temp_Trav",
//         "CW_Temp_Spgt", "CW_Flow", "CW_Pres", "CW_Valve", "Hop_Jrk_Spd", "Hop_Mid_Spd", "Hop_Norm_Spd",
//         "Hop_Up", "MM_Skt_Spd", "MM_Brl_Spd", "MM_Spgt_Spd", "MM_Final_Spd", "MM_Cool_Spd", "MM_Act_Cur",
//         "MPU_On_Dly", "MPU_Off_Dly", "MPU_Srt_Pos", "MPU_Stp_Pos", "MPU_Spd", "Pipe_Count", "SPU_On_Dly",
//         "SPU_Spd", "SPU_On_Dur", "Trav_Skt_Spd", "Trav_Brl1_Spd", "Trav_Brl2_Spd", "Trav_Spgt1_Spd",
//         "Trav_Spgt2_Spd", "Trav_Final_Spd", "Trav_Up", "Trav_Dwn", "SPMC4_DWN_TMR3", "SPMC4_DWN_TMR2",
//         "Inc_On_Dly1", "Inc_Spd1", "Inc_Stp_Pos1", "Pipe_DN_Num1"
//     ];

//     const setClauses = fields.map(f => {
//         const camelCase = f.charAt(0).toLowerCase() + f.slice(1).replace(/_([a-z])/g, g => g[1].toUpperCase());
//         const val = data[f] !== undefined ? data[f] : (data[camelCase] !== undefined ? data[camelCase] : existing[f]);
        
//         if (f.includes("Timestamp")) {
//             request.input(f, sql.DateTime2, val ? new Date(val) : null);
//         } else {
//             request.input(f, sql.Decimal(18, 4), val !== null && val !== undefined ? Number(val) : null);
//         }
//         return `${f} = @${f}`;
//     });

//     const result = await request.query(`
//         UPDATE ${TABLE} SET 
//             ${setClauses.join(",\n            ")}
//         OUTPUT INSERTED.*
//         WHERE Id = @dbId
//     `);

//     return result.recordset[0] ? wrapRowAsDocument(result.recordset[0]) : null;
// }

// async function findByIdAndDelete(id) {
//     const existing = await findById(id);
//     if (!existing) return null;

//     const pool = await getBdpCcmPool();
//     const request = pool.request();
//     request.input("dbId", sql.Int, existing.id);

//     const result = await request.query(`DELETE FROM ${TABLE} OUTPUT DELETED.* WHERE Id = @dbId`);
//     return result.recordset[0] ? wrapRowAsDocument(result.recordset[0]) : null;
// }

// function wrapRowAsDocument(row) {
//     return {
//         ...row,
//         _id: row.Id,
//         id: row.Id,
//         toObject() { return { ...this }; },
//         lean() { return { ...this }; }
//     };
// }

// module.exports = {
//     findAll,
//     findById,
//     findOne,
//     find,
//     countDocuments,
//     create,
//     findByIdAndUpdate,
//     findByIdAndDelete
// };


const sql = require("mssql");
const { getBdpCcmPool } = require("../config/sqlDb");

// =====================================================
// TABLE NAME
// IMPORTANT: CCM 04 contains a space
// Therefore SQL Server requires [CCM 04]
// =====================================================
const TABLE = "[BDP_CCM_NEW].[dbo].[CCM 04]";
// =====================================================
// ALL TABLE FIELDS
// =====================================================
const fields = [
    "Timestamp",
    "LocalTimestamp",
    "CW_Temp_In",
    "CW_Temp_Out",
    "CCM_BCK_Speed_Value",
    "Socket_Pouring_Time",
    "First_Straight_Pouring_Position",
    "Second_Straight_Pouring_Position",
    "First_Spigot_Pouring_Position",
    "Second_Spigot_Pouring_Position_Left",
    "Second_Spigot_Pouring_Position_Right",
    "Spigot_Delay_Time",
    "Pouring_Final_Position",
    "CCM_FWD_Limited_Position",
    "CCM_BCK_Limited_Position_Left",
    "CCM_BCK_Limited_Position_Right",
    "CCM_Socket_Pouring_Delay_Time",
    "Ladle_First_Fast_Speed",
    "Ladle_Second_Fast_Speed",
    "Ladle_Third_Fast_Speed",
    "Ladle_First_middle_Speed",
    "Ladle_Second_middle_Speed",
    "Ladle_Third_middle_Speed",
    "Ladle_First_Normal_Speed",
    "Ladle_Second_Normal_Speed",
    "Ladle_Third_Normal_Speed",
    "Mould_Motor_Low_Speed",
    "CCM_Position_Left_Powder_Start",
    "CCM_Position_Left_Powder_Stop",
    "CCM_Position_Right_Powder_Start",
    "CCM_Position_Right_Powder_Stop",
    "Socket_Powder_Start_Time",
    "Socket_Cooling_Time",
    "CCM_Down_Position_Left_Powder_Start",
    "CCM_Down_Position_Left_Powder_Stop",
    "CCM_Down_Position_Right_Powder_Start",
    "CCM_Down_Position_Right_Powder_Stop",
    "ladle_auto_doen_time_pre",
    "Left_MPU_Agitator",
    "SPIGOT_POURING_DELAY_PRE",
    "Metal_Sensor_Log",
    "MPU_AIR_PRESSURE_RIGHT",
    "MPU_AIR_PRESSURE_LEFT",
    "MPU_DLG_LEFT",
    "MPU_DLG_RIGHT",
    "Output",
    "CW_Temp_Skt",
    "CW_Temp_Trav",
    "CW_Temp_Spgt",
    "CW_Flow",
    "CW_Pres",
    "CW_Valve",
    "Hop_Jrk_Spd",
    "Hop_Mid_Spd",
    "Hop_Norm_Spd",
    "Hop_Up",
    "MM_Skt_Spd",
    "MM_Brl_Spd",
    "MM_Spgt_Spd",
    "MM_Final_Spd",
    "MM_Cool_Spd",
    "MM_Act_Cur",
    "MPU_On_Dly",
    "MPU_Off_Dly",
    "MPU_Srt_Pos",
    "MPU_Stp_Pos",
    "MPU_Spd",
    "Pipe_Count",
    "SPU_On_Dly",
    "SPU_Spd",
    "SPU_On_Dur",
    "Trav_Skt_Spd",
    "Trav_Brl1_Spd",
    "Trav_Brl2_Spd",
    "Trav_Spgt1_Spd",
    "Trav_Spgt2_Spd",
    "Trav_Final_Spd",
    "Trav_Up",
    "Trav_Dwn",
    "SPMC4_DWN_TMR3",
    "SPMC4_DWN_TMR2",
    "Inc_On_Dly1",
    "Inc_Spd1",
    "Inc_Stp_Pos1",
    "Pipe_DN_Num1"
];

// =====================================================
// CONVERT SQL COLUMN NAME TO CAMEL CASE
// =====================================================
function getCamelCase(field) {
    return (
        field.charAt(0).toLowerCase() +
        field
            .slice(1)
            .replace(/_([a-zA-Z])/g, (_, letter) =>
                letter.toUpperCase()
            )
    );
}

// =====================================================
// GET VALUE FROM REQUEST DATA
// =====================================================
function getFieldValue(data, field, fallback = null) {

    if (data[field] !== undefined) {
        return data[field];
    }

    const camelCase = getCamelCase(field);

    if (data[camelCase] !== undefined) {
        return data[camelCase];
    }

    return fallback;
}

// =====================================================
// WRAP SQL ROW
// =====================================================
function wrapRowAsDocument(row) {

    return {
        ...row,

        _id: row.Id,
        id: row.Id,

        toObject() {
            return {
                ...this
            };
        },

        lean() {
            return {
                ...this
            };
        }
    };
}

// =====================================================
// FIND ALL
// =====================================================
async function findAll(query = {}) {

    const pool = await getBdpCcmPool();

    let queryStr = `
        SELECT *
        FROM ${TABLE}
    `;

    const request = pool.request();

    const conditions = [];

    // Pipe count filter
    if (
        query.pipeCount !== undefined ||
        query.Pipe_Count !== undefined
    ) {

        const pipeCount =
            query.pipeCount !== undefined
                ? query.pipeCount
                : query.Pipe_Count;

        request.input(
            "pipeCount",
            sql.Decimal(18, 4),
            Number(pipeCount)
        );

        conditions.push(
            "[Pipe_Count] = @pipeCount"
        );
    }

    if (conditions.length > 0) {

        queryStr += `
            WHERE ${conditions.join(" AND ")}
        `;
    }

    queryStr += `
        ORDER BY [Id] DESC
    `;

    const result = await request.query(queryStr);

    return result.recordset.map(
        row => wrapRowAsDocument(row)
    );
}

// =====================================================
// FIND BY ID
// =====================================================
async function findById(id) {

    if (
        id === undefined ||
        id === null ||
        id === ""
    ) {
        return null;
    }

    const numericId = Number(id);

    if (!Number.isInteger(numericId)) {
        return null;
    }

    const pool = await getBdpCcmPool();

    const request = pool.request();

    request.input(
        "id",
        sql.Int,
        numericId
    );

    const result = await request.query(`
        SELECT *
        FROM ${TABLE}
        WHERE [Id] = @id
    `);

    return result.recordset[0]
        ? wrapRowAsDocument(result.recordset[0])
        : null;
}

// =====================================================
// FIND ONE
// =====================================================
async function findOne(query = {}) {

    const pool = await getBdpCcmPool();

    const request = pool.request();

    let queryStr = `
        SELECT TOP 1 *
        FROM ${TABLE}
    `;

    const conditions = [];

    if (
        query.id !== undefined ||
        query.Id !== undefined
    ) {

        const id =
            query.id !== undefined
                ? query.id
                : query.Id;

        request.input(
            "id",
            sql.Int,
            Number(id)
        );

        conditions.push(
            "[Id] = @id"
        );
    }

    if (conditions.length > 0) {

        queryStr += `
            WHERE ${conditions.join(" AND ")}
        `;
    }

    queryStr += `
        ORDER BY [Id] DESC
    `;

    const result = await request.query(queryStr);

    return result.recordset[0]
        ? wrapRowAsDocument(result.recordset[0])
        : null;
}

// =====================================================
// FIND
// =====================================================
async function find(query = {}) {

    return findAll(query);
}

// =====================================================
// COUNT DOCUMENTS
// =====================================================
async function countDocuments(query = {}) {

    const pool = await getBdpCcmPool();

    const request = pool.request();

    let queryStr = `
        SELECT COUNT(*) AS total
        FROM ${TABLE}
    `;

    const conditions = [];

    if (
        query.pipeCount !== undefined ||
        query.Pipe_Count !== undefined
    ) {

        const pipeCount =
            query.pipeCount !== undefined
                ? query.pipeCount
                : query.Pipe_Count;

        request.input(
            "pipeCount",
            sql.Decimal(18, 4),
            Number(pipeCount)
        );

        conditions.push(
            "[Pipe_Count] = @pipeCount"
        );
    }

    if (conditions.length > 0) {

        queryStr += `
            WHERE ${conditions.join(" AND ")}
        `;
    }

    const result = await request.query(queryStr);

    return result.recordset[0]?.total || 0;
}

// =====================================================
// CREATE
// =====================================================
async function create(data = {}) {

    const pool = await getBdpCcmPool();

    const request = pool.request();

    fields.forEach(field => {

        const value = getFieldValue(
            data,
            field,
            null
        );

        // -----------------------------------------
        // Timestamp fields
        // -----------------------------------------
        if (
            field === "Timestamp" ||
            field === "LocalTimestamp"
        ) {

            request.input(
                field,
                sql.DateTime2,
                value
                    ? new Date(value)
                    : null
            );

            return;
        }

        // -----------------------------------------
        // Numeric fields
        // -----------------------------------------
        request.input(
            field,
            sql.Decimal(18, 4),
            value === null ||
            value === undefined ||
            value === ""
                ? null
                : Number(value)
        );
    });

    const columns = fields
        .map(field => `[${field}]`)
        .join(", ");

    const values = fields
        .map(field => `@${field}`)
        .join(", ");

    const queryStr = `
        INSERT INTO ${TABLE}
        (${columns})
        OUTPUT INSERTED.*
        VALUES
        (${values})
    `;

    const result = await request.query(queryStr);

    return result.recordset[0]
        ? wrapRowAsDocument(result.recordset[0])
        : null;
}

// =====================================================
// UPDATE
// =====================================================
async function findByIdAndUpdate(id, data = {}) {

    const existing = await findById(id);

    if (!existing) {
        return null;
    }

    const pool = await getBdpCcmPool();

    const request = pool.request();

    request.input(
        "dbId",
        sql.Int,
        Number(existing.id)
    );

    const setClauses = [];

    fields.forEach(field => {

        const value = getFieldValue(
            data,
            field,
            existing[field]
        );

        // -----------------------------------------
        // Timestamp fields
        // -----------------------------------------
        if (
            field === "Timestamp" ||
            field === "LocalTimestamp"
        ) {

            request.input(
                field,
                sql.DateTime2,
                value
                    ? new Date(value)
                    : null
            );

        } else {

            request.input(
                field,
                sql.Decimal(18, 4),
                value === null ||
                value === undefined ||
                value === ""
                    ? null
                    : Number(value)
            );
        }

        setClauses.push(
            `[${field}] = @${field}`
        );
    });

    const queryStr = `
        UPDATE ${TABLE}
        SET
            ${setClauses.join(",\n            ")}
        OUTPUT INSERTED.*
        WHERE [Id] = @dbId
    `;

    const result = await request.query(queryStr);

    return result.recordset[0]
        ? wrapRowAsDocument(result.recordset[0])
        : null;
}

// =====================================================
// DELETE
// =====================================================
async function findByIdAndDelete(id) {

    const existing = await findById(id);

    if (!existing) {
        return null;
    }

    const pool = await getBdpCcmPool();

    const request = pool.request();

    request.input(
        "dbId",
        sql.Int,
        Number(existing.id)
    );

    const queryStr = `
        DELETE FROM ${TABLE}
        OUTPUT DELETED.*
        WHERE [Id] = @dbId
    `;

    const result = await request.query(queryStr);

    return result.recordset[0]
        ? wrapRowAsDocument(result.recordset[0])
        : null;
}

// =====================================================
// EXPORTS
// =====================================================
module.exports = {
    findAll,
    findById,
    findOne,
    find,
    countDocuments,
    create,
    findByIdAndUpdate,
    findByIdAndDelete
};