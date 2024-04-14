const jwt = require("jsonwebtoken");
const User = require("../models/Users.js");

const JWT_KEY = process.env.JWT_SECRET_KEY;

const authMiddleware = async (req, res, next) => {
    try {
        // Extract the token from the request header
        const token = req.headers.authorization;

        // Check if token is present
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // Verify the token
        const decoded = jwt.verify(token, JWT_KEY);

        // Check if the user exists in the database
        const user = await User.findOne({ where: { id: decoded.id } });
        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        // Attach the user object to the request
        req.user = user;
        
        // Proceed to the next middleware
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
};

module.exports = authMiddleware;
