const Ccm7Model = require("../models/ccm7Model");

class Ccm7Controller {
    static async getCcm7Data(req, res) {
        try {
            const data = await Ccm7Model.getAllCcm7Data();
            return res.status(200).json({
                success: true,
                count: data.length,
                data: data
            });
        } catch (error) {
            console.error("CCM 7 Controller Error:", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message
            });
        }
    }
}

module.exports = Ccm7Controller;