const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    try {
       
        const username = req.headers['username'];
        const password = req.headers['password'];

        const user = await User.findOne({ username: username, password: password });

        if (user) {
            req.isUserAuthenticated = true;
        } else {
            req.isUserAuthenticated = false;
        }
        
        next();
    } catch (error) {
        res.status(500).json({ message: "Error authenticating user", error: error.message });
    }

}

module.exports = userMiddleware;