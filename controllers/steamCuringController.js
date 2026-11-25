const SteamCuringModel = require("../models/steamCuringModel");

class SteamCuringController {
    static async getSteamCuringData(req, res) {
        try {
            const data = await SteamCuringModel.getAllSteamCuringData();
            return res.status(200).json({
                success: true,
                count: data.length,
                data: data
            });
        } catch (error) {
            console.error("Controller Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = SteamCuringController;