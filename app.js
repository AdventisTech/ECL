const path = require("path");
const express = require("express");
const cors = require("cors");

require("dotenv").config({
    path: path.join(__dirname, ".env")
});

const app = express();

// ===============================
// 🛡️ CORS & PRIVATE NETWORK ACCESS (PNA) CONFIGURATION
// ===============================
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  next();
});

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "Access-Control-Request-Private-Network",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers"
  ],
  credentials: true
}));

// ===============================
// MIDDLEWARE
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// API ROUTES (MUST BE BEFORE STATIC FILES)
// ===============================
app.use("/api/spdccm", require("./routes/spdCcmRoutes"));
app.use("/api/ccm3", require("./routes/ccm3Routes")); 
app.use("/api/ccm03-new", require("./routes/ccm03NewRoutes"));
app.use("/api/ccm01", require("./routes/ccm01Routes"));
app.use('/api/ccm05', require('./routes/ccm05Routes'));
app.use('/api/ccm11', require('./routes/ccm11Routes'));
app.use('/api/ccm12', require('./routes/ccm12Routes'));

const ccm6Routes = require("./routes/ccm6Routes");
const ccm7Routes = require("./routes/ccm7Routes");
const ccm8Routes = require("./routes/ccm8Routes");
const ccm9Routes = require("./routes/ccm9Routes");
const ccm10Routes = require("./routes/ccm10Routes");

app.use("/api/ccm6", ccm6Routes);
app.use("/api/ccm7", ccm7Routes);
app.use("/api/ccm8", ccm8Routes);
app.use("/api/ccm9", ccm9Routes);
app.use("/api/ccm10", ccm10Routes);

const ccm13Routes = require("./routes/ccm13Routes");
const ccm14Routes = require("./routes/ccm14Routes");
app.use("/api/ccm13", ccm13Routes);
app.use("/api/ccm14", ccm14Routes);

app.use("/api/cml", require("./routes/cmlRoutes"));
app.use("/api/steam-curing", require("./routes/steamCuringRoutes"));
app.use("/api/zinc", require("./routes/zincRoutes"));
app.use("/api/bitumen", require("./routes/bitumenRoutes"));
app.use("/api/mould-shop", require("./routes/mouldShopRoutes"));
app.use("/api/core-shooter", require("./routes/coreShooterRoutes"));
app.use("/api/melting", require("./routes/meltingRoutes"));
app.use("/api/annealing-furnace", require("./routes/annealingFurnaceRoutes"));

// ===============================
// ANGULAR FRONTEND
// ===============================
// ✅ FIX: Correct path for Render (no "../")
const angularPath = path.join(__dirname, "dist/OptiMES2.0/browser");

app.use(express.static(angularPath));

// ✅ SPA Fallback: Serve index.html for any non-API route
app.get('*', (req, res) => {
    res.sendFile(path.join(angularPath, "index.html"));
});

module.exports = app;