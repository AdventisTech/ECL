require("dotenv").config();
const http = require("http");
const app = require("./app"); // ✅ Import the configured Express app from app.js
const { getBdpCcmPool, getBdpCcmnewPool, sql } = require("./config/sqlDb");

const PORT = process.env.PORT || 3000;

// Test route (optional, can stay here or in a route file)
app.get("/api/test-db", async (req, res) => {
  try {
    const pool = await getBdpCcmPool();
    const result = await pool.request().query("SELECT 1 AS status");
    res.json({ success: true, data: result.recordset });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log(`==========================================`);
  console.log(`🚀 Server running on Port ${PORT}`);
  console.log(`🌐 API: http://localhost:${PORT}`);
  console.log(`==========================================`);

  // Initialize DB connections on startup
  try {
    await getBdpCcmPool();
  } catch (err) {
    console.error("Initial DB connection failed:", err.message);
  }
});