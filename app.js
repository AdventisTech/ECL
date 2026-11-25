const path = require("path");
const express = require("express");
const cors = require("cors");
//192.1.45.180

require("dotenv").config({
    path: path.join(__dirname, ".env")
});

const app = express();

// Angular build path
const angularPath = path.join(
    __dirname,
    "../dist/OptiMES2.0/browser"
);

// ===============================
// 🛡️ CORS & PRIVATE NETWORK ACCESS (PNA) CONFIGURATION
// ===============================

// 1. Custom middleware to ensure PNA header is set for ALL responses
// This must be placed BEFORE the cors middleware.
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Private-Network", "true");
  next();
});

// 2. Configure CORS explicitly to handle preflight (OPTIONS) requests properly
app.use(cors({
  origin: true, // Allow the requesting origin (e.g., http://switotserver:4200)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type", 
    "Authorization", 
    "Access-Control-Request-Private-Network", // Crucial for PNA preflight
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
// API ROUTES
// ===============================
app.use(
    "/api/spdccm",
    require("./routes/spdCcmRoutes")
);

// app.use(
//     "/api/spdccmhour",
//     require("./routes/spdCcmHourlyRoutes")
// );
// app.use("/api/dim-machines", 
//      require("./routes/dimMachinesRoutes")
//     );
// app.use("/api/dim-employees",
//      require("./routes/dimEmployeesRoutes")
//     );
// app.use("/api/dim-pipe-class", 
//     require("./routes/dimPipeClassRoutes")
// );   
// app.use("/api/dim-recipes", 
//     require("./routes/dimRecipesRoutes")
// ); 
// app.use("/api/dim-rejection-reasons", 
//     require("./routes/dimRejectionReasonsRoutes")
// );
// app.use("/api/production-logs", 
//     require("./routes/factProductionLogsRoutes")
// );
// app.use("/api/machine-recipes",
//      require("./routes/mapMachineRecipesRoutes")
//    );

app.use("/api/ccm3", 
    require("./routes/ccm3Routes")
); 

app.use("/api/ccm03-new", 
    require("./routes/ccm03NewRoutes")
);

app.use("/api/ccm01", require("./routes/ccm01Routes"));

// Mount the route
app.use('/api/ccm05',  require('./routes/ccm05Routes'));

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


app.use("/api/cml",  require("./routes/cmlRoutes"));



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
app.use(express.static(angularPath));
const cmlRoutes = require("./routes/cmlRoutes");

// Angular routing fallback (Catch-all for non-API routes)
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(angularPath, "index.html"));
});

module.exports = app;