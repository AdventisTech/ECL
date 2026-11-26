const path = require("path");
const fs = require("fs");
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
app.use("/api/ccm05", require("./routes/ccm05Routes"));
app.use("/api/ccm11", require("./routes/ccm11Routes"));
app.use("/api/ccm12", require("./routes/ccm12Routes"));

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


app.use("/api/hptm3", require("./routes/hptm3Routes"));
app.use("/api/hptm4", require("./routes/hptm4Routes"));
app.use("/api/hptm5", require("./routes/hptm5Routes"));
app.use("/api/hptm6", require("./routes/hptm6Routes"));
app.use("/api/hptm7", require("./routes/hptm7Routes"));
app.use("/api/hptm1", require("./routes/hptm1Routes"));


// Unknown API routes return JSON 404 instead of the Angular page
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API route not found", path: req.originalUrl });
});

// ===============================
// ANGULAR FRONTEND
// ===============================
// Looks for the folder that actually contains index.html.
// Add or remove candidates to match your repo layout.
const candidates = [
  path.join(__dirname, "ECL", "browser"),
  path.join(__dirname, "browser"),
  path.join(__dirname, "dist", "OptiMES2.0", "browser"),
  path.join(__dirname, "public")
];

const angularPath =
  candidates.find((p) => fs.existsSync(path.join(p, "index.html"))) ||
  candidates[0];

console.log("Serving Angular from:", angularPath,
  fs.existsSync(path.join(angularPath, "index.html")) ? "(found)" : "(index.html NOT found)");

app.use(express.static(angularPath));

// ✅ SPA fallback (Express 4 and 5 compatible; no '*' route pattern)
app.use((req, res, next) => {
  if (req.method !== "GET" && req.method !== "HEAD") return next();
  res.sendFile(path.join(angularPath, "index.html"), (err) => {
    if (err) next(err);
  });
});

module.exports = app;