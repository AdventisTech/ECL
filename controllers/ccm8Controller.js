const Ccm8Model = require("../models/ccm8Model");

class Ccm8Controller {
    static async getCcm8Data(req, res) {
        try {
            const data = await Ccm8Model.getAllCcm8Data();
            return res.status(200).json({
                success: true,
                count: data.length,
                data: data
            });
        } catch (error) {
            console.error("CCM 8 Controller Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = Ccm8Controller;