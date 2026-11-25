const sql = require("mssql");
const { getBdpCcmnewPool } = require("../config/sqlDb");

const TABLE = "[dbo].[CCM 04]";

const INT_FIELDS = new Set([
    "Pipe_Count",
    "Pipe_DN_Num1"
]);

const DATE_FIELDS = new Set([
    "Timestamp",
    "LocalTimestamp"
]);

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

function getCamelCase(field) {
    return (
        field.charAt(0).toLowerCase() +
        field
            .slice(1)
            .replace(/_([a-zA-Z])/g, (_, letter) => letter.toUpperCase())
    );
}

function getFieldValue(data, field, fallback = null) {
    if (!data || typeof data !== "object") return fallback;
    if (data[field] !== undefined) return data[field];

    const camelCase = getCamelCase(field);
    if (data[camelCase] !== undefined) return data[camelCase];

    return fallback;
}

function parseBigIntId(id) {
    if (id === undefined || id === null || id === "") return null;
    try {
        const str = String(id).trim();
        if (!/^-?\d+$/.test(str)) return null;
        return BigInt(str);
    } catch {
        return null;
    }
}

function bindFieldInput(request, field, rawValue) {
    if (DATE_FIELDS.has(field)) {
        const dt = rawValue ? new Date(rawValue) : null;
        request.input(field, sql.DateTime2, dt && !Number.isNaN(dt.getTime()) ? dt : null);
        return;
    }

    if (rawValue === null || rawValue === undefined || rawValue === "") {
        if (INT_FIELDS.has(field)) {
            request.input(field, sql.Int, null);
        } else {
            request.input(field, sql.Float, null);
        }
        return;
    }

    const num = Number(rawValue);
    if (Number.isNaN(num)) {
        request.input(field, sql.Float, null);
        return;
    }

    if (INT_FIELDS.has(field)) {
        request.input(field, sql.Int, Math.trunc(num));
    } else {
        request.input(field, sql.Float, num);
    }
}

function wrapRowAsDocument(row) {
    const rowId = row.Id ?? row.id;
    return {
        ...row,
        _id: rowId,
        id: rowId,
        toObject() {
            return { ...this };
        },
        lean() {
            return { ...this };
        }
    };
}

async function findAll(query = {}) {
    const pool = await getBdpCcmnewPool();
    const request = pool.request();
    const conditions = [];

    let queryStr = `
        SELECT TOP (1000) *
        FROM ${TABLE}
    `;

    const pipeCount = query.pipeCount !== undefined ? query.pipeCount : query.Pipe_Count;
    if (pipeCount !== undefined && pipeCount !== null && pipeCount !== "") {
        request.input("pipeCount", sql.Int, Math.trunc(Number(pipeCount)));
        conditions.push("[Pipe_Count] = @pipeCount");
    }

    if (conditions.length > 0) {
        queryStr += ` WHERE ${conditions.join(" AND ")}`;
    }

    queryStr += ` ORDER BY [Id] DESC`;

    const result = await request.query(queryStr);
    return result.recordset.map((row) => wrapRowAsDocument(row));
}

async function findById(id) {
    const bigId = parseBigIntId(id);
    if (bigId === null) return null;

    const pool = await getBdpCcmnewPool();
    const request = pool.request();
    request.input("id", sql.BigInt, bigId);

    const result = await request.query(`
        SELECT *
        FROM ${TABLE}
        WHERE [Id] = @id
    `);

    return result.recordset[0] ? wrapRowAsDocument(result.recordset[0]) : null;
}

async function findOne(query = {}) {
    const pool = await getBdpCcmnewPool();
    const request = pool.request();
    const conditions = [];

    let queryStr = `
        SELECT TOP (1) *
        FROM ${TABLE}
    `;

    const rawId = query.id !== undefined ? query.id : query.Id;
    if (rawId !== undefined) {
        const bigId = parseBigIntId(rawId);
        if (bigId === null) return null;
        request.input("id", sql.BigInt, bigId);
        conditions.push("[Id] = @id");
    }

    if (conditions.length > 0) {
        queryStr += ` WHERE ${conditions.join(" AND ")}`;
    }

    queryStr += ` ORDER BY [Id] DESC`;

    const result = await request.query(queryStr);
    return result.recordset[0] ? wrapRowAsDocument(result.recordset[0]) : null;
}

async function find(query = {}) {
    return findAll(query);
}

async function countDocuments(query = {}) {
    const pool = await getBdpCcmnewPool();
    const request = pool.request();
    const conditions = [];

    let queryStr = `
        SELECT COUNT(*) AS total
        FROM ${TABLE}
    `;

    const pipeCount = query.pipeCount !== undefined ? query.pipeCount : query.Pipe_Count;
    if (pipeCount !== undefined && pipeCount !== null && pipeCount !== "") {
        request.input("pipeCount", sql.Int, Math.trunc(Number(pipeCount)));
        conditions.push("[Pipe_Count] = @pipeCount");
    }

    if (conditions.length > 0) {
        queryStr += ` WHERE ${conditions.join(" AND ")}`;
    }

    const result = await request.query(queryStr);
    return result.recordset[0]?.total || 0;
}

async function create(data = {}) {
    const pool = await getBdpCcmnewPool();
    const request = pool.request();

    for (const field of fields) {
        const defaultTs = field === "Timestamp" ? new Date() : null;
        const value = getFieldValue(data, field, defaultTs);
        bindFieldInput(request, field, value);
    }

    const columns = fields.map((field) => `[${field}]`).join(", ");
    const values = fields.map((field) => `@${field}`).join(", ");

    const queryStr = `
        INSERT INTO ${TABLE}
        (${columns})
        OUTPUT INSERTED.*
        VALUES
        (${values})
    `;

    const result = await request.query(queryStr);
    return result.recordset[0] ? wrapRowAsDocument(result.recordset[0]) : null;
}

async function findByIdAndUpdate(id, data = {}) {
    const existing = await findById(id);
    if (!existing) return null;

    const pool = await getBdpCcmnewPool();
    const request = pool.request();
    request.input("dbId", sql.BigInt, parseBigIntId(existing.Id ?? existing.id));

    const setClauses = [];

    for (const field of fields) {
        const value = getFieldValue(data, field, existing[field]);
        bindFieldInput(request, field, value);
        setClauses.push(`[${field}] = @${field}`);
    }

    const queryStr = `
        UPDATE ${TABLE}
        SET
            ${setClauses.join(",\n            ")}
        OUTPUT INSERTED.*
        WHERE [Id] = @dbId
    `;

    const result = await request.query(queryStr);
    return result.recordset[0] ? wrapRowAsDocument(result.recordset[0]) : null;
}

async function findByIdAndDelete(id) {
    const existing = await findById(id);
    if (!existing) return null;

    const pool = await getBdpCcmnewPool();
    const request = pool.request();
    request.input("dbId", sql.BigInt, parseBigIntId(existing.Id ?? existing.id));

    const queryStr = `
        DELETE FROM ${TABLE}
        OUTPUT DELETED.*
        WHERE [Id] = @dbId
    `;

    const result = await request.query(queryStr);
    return result.recordset[0] ? wrapRowAsDocument(result.recordset[0]) : null;
}

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
