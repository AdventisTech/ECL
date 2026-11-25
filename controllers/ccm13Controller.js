const Ccm13Model = require("../models/ccm13Model");

class Ccm13Controller {
    static async getCcm13Data(req, res) {
        try {
            const data = await Ccm13Model.getAllCcm13Data();
            return res.status(200).json({
                success: true,
                count: data.length,
                data: data
            });
        } catch (error) {
            console.error("CCM 13 Controller Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = Ccm13Controller;