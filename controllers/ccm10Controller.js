const Ccm10Model = require("../models/ccm10Model");

class Ccm10Controller {
    static async getCcm10Data(req, res) {
        try {
            const data = await Ccm10Model.getAllCcm10Data();
            return res.status(200).json({
                success: true,
                count: data.length,
                data: data
            });
        } catch (error) {
            console.error("CCM 10 Controller Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = Ccm10Controller;