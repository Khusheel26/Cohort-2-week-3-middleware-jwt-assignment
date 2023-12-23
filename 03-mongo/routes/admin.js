const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const username = req.headers['username'];
    const password = req.headers['password'];

    try {
        const admin = new Admin({
            username: username,
            password: password
        });

        await admin.save();
        res.status(200).json({
            message: "Admin created successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating admin.",
            error: error.message
        });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    if (req.isAdminAuthenticated) {
        let id = Math.floor(Math.random() * 1001);
        Course.create({
        courseId: id,
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageLink: req.body.imageLink,
        published: req.body.published
    })
    res.json({
        message: 'Course created successfully',
        courseId: id
    })
    } else {
        res.status(500).json({ message: "Error authenticating admin"});
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    if (req.isAdminAuthenticated) {
        try {
            const courses = await Course.find({});
            res.status(200).json({ courses });
        } catch (error) {
            res.status(500).json({
                message:"There was an error while fetching the courses."
            })
        }
    } else {
        res.status(500).json({ message: "Error authenticating admin"});
    }
});

module.exports = router;
