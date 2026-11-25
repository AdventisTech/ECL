const MeltingModel = require("../models/meltingModel");

class MeltingController {
    static async getMeltingData(req, res) {
        try {
            const data = await MeltingModel.getAllMeltingData();
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

module.exports = MeltingController;