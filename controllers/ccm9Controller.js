const Ccm9Model = require("../models/ccm9Model");

class Ccm9Controller {
    static async getCcm9Data(req, res) {
        try {
            const data = await Ccm9Model.getAllCcm9Data();
            return res.status(200).json({
                success: true,
                count: data.length,
                data: data
            });
        } catch (error) {
            console.error("CCM 9 Controller Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = Ccm9Controller;