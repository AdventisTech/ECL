const Ccm6Model = require("../models/ccm6Model");

class Ccm6Controller {
    static async getCcm6Data(req, res) {
        try {
            const data = await Ccm6Model.getAllCcm6Data();
            return res.status(200).json({
                success: true,
                count: data.length,
                data: data
            });
        } catch (error) {
            console.error("CCM 6 Controller Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = Ccm6Controller;