const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    try {
       
        const username = req.headers['username'];
        const password = req.headers['password'];

        const user = await Admin.findOne({ username: username, password: password });

        if (user) {
            req.isAdminAuthenticated = true;
        } else {
            req.isAdminAuthenticated = false;
        }
        
        next();
    } catch (error) {
        res.status(500).json({ message: "Error authenticating admin", error: error.message });
    }
}

module.exports = adminMiddleware;
