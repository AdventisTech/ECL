const ZincModel = require("../models/zincModel");

class ZincController {
    static async getZincData(req, res) {
        try {
            const data = await ZincModel.getAllZincData();
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

module.exports = ZincController;