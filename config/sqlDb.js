const sql = require("mssql"); // ✅ Changed from 'mssql/msnodesqlv8'

const DB_ENV_KEYS = {
    bdp_ccm: "SQL_DATABASE_BDP_CCM",
    bdp_cmm_new: "SQL_DATABASE_BDP_CCM_NEW",
    sdp_ccm: "SQL_DATABASE_SDP_CCM",
    cml_db: "SQL_DATABASE_CML",
    melting: "SQL_DATABASE_MELT",
    annealing: "SQL_DATABASE_ANNEAL",
    stream: "SQL_DATABASE_STREAM",
    zinc: "SQL_DATABASE_ZINC",
    bitumen: "SQL_DATABASE_BITUMEN",
    moldshop: "SQL_DATABASE_MOULD_SHOP",
    coreshooler: "SQL_DATABASE_CORE",
    HPTM3: "SQL_DATABASE_HPTM3",
    HPTM4: "SQL_DATABASE_HPTM4",
    HPTM5: "SQL_DATABASE_HPTM5",
    HPTM6: "SQL_DATABASE_HPTM6",
    HPTM7: "SQL_DATABASE_HPTM7",
    HPTM1: "SQL_DATABASE_HPTM_1"
};

const poolPromises = {};

async function getPool(dbKey) {
    const envKey = DB_ENV_KEYS[dbKey];
    if (!envKey) throw new Error(`Unknown database key: ${dbKey}`);

    const database = process.env[envKey];
    if (!database) throw new Error(`Missing environment variable: ${envKey}`);

    if (poolPromises[dbKey]) return poolPromises[dbKey];

    console.log(`🔄 Connecting to Azure SQL: ${process.env.SQL_SERVER} / ${database}`);

    // Base configuration for Azure SQL
    const config = {
        server: process.env.SQL_SERVER,
        database: database,
        user: process.env.SQL_USER,         // Added for Azure
        password: process.env.SQL_PASSWORD, // Added for Azure
        options: {
            encrypt: process.env.SQL_ENCRYPT === 'true',
            trustServerCertificate: process.env.SQL_TRUST_SERVER_CERT === 'true',
            enableArithAbort: true
        },
        pool: { 
            max: 10, 
            min: 0, 
            idleTimeoutMillis: 30000 
        }
    };

    poolPromises[dbKey] = new sql.ConnectionPool(config)
        .connect()
        .then((pool) => {
            console.log(`✅ AZURE SQL CONNECTED SUCCESSFULLY (${database})`);
            return pool;
        })
        .catch((err) => {
            console.error(`❌ AZURE SQL CONNECTION FAILED (${database}): ${err.message}`);
            poolPromises[dbKey] = null;
            throw err;
        });

    return poolPromises[dbKey];
}

function getBdpCcmPool() { return getPool("bdp_ccm"); }
function getBdpCcmnewPool() { return getPool("bdp_cmm_new"); }
function getSdpCcmPool() { return getPool("sdp_ccm"); }
function getcmlPool() { return getPool("cml_db"); }
function getmeltPool() { return getPool("melting"); }
function getannealingPool() { return getPool("annealing"); }
function getstreamPool() { return getPool("stream"); }
function getzincPool() { return getPool("zinc"); }
function getbitumenPool() { return getPool("bitumen"); }
function getmoldshopPool() { return getPool("moldshop"); }
function getcoreshoolerPool() { return getPool("coreshooler"); }
function getHPTM3Pool() { return getPool("HPTM3"); }
function getHPTM4Pool() { return getPool("HPTM4"); }
function getHPTM5Pool() { return getPool("HPTM5"); }
function getHPTM6Pool() { return getPool("HPTM6"); }
function getHPTM7Pool() { return getPool("HPTM7"); }
function getHPTM1Pool() { return getPool("HPTM1"); }

module.exports = { 
    sql, 
    getPool, 
    getBdpCcmPool,
    getBdpCcmnewPool,
    getSdpCcmPool,
    getcmlPool,
    getmeltPool,
    getannealingPool,
    getstreamPool,
    getzincPool,
    getbitumenPool,
    getmoldshopPool,
    getcoreshoolerPool ,
    getHPTM3Pool,
    getHPTM4Pool,
    getHPTM5Pool,
    getHPTM6Pool,
    getHPTM7Pool,
    getHPTM1Pool
};