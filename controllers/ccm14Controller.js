const Ccm14Model = require("../models/ccm14Model");

class Ccm14Controller {
    static async getCcm14Data(req, res) {
        try {
            const data = await Ccm14Model.getAllCcm14Data();
            return res.status(200).json({
                success: true,
                count: data.length,
                data: data
            });
        } catch (error) {
            console.error("CCM 14 Controller Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = Ccm14Controller;