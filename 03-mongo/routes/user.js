const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {Admin, User, Course} = require("../db/index");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.headers['username'];
    const password = req.headers['password'];

    try {
        const user = new User({
            username: username,
            password: password,
            coursesPurchased:[]
        });

        await user.save();
        res.status(200).json({
            message: "User created successfully."
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating admin.",
            error: error.message
        });
    }
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find().then((courses) => {res.json(courses)});
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    if(req.isUserAuthenticated){
        try {
            const username = req.headers['username'];
            const courseId = req.params['courseId'];
    
            const result = await User.updateOne(
                { username: username }, 
                { $push: {coursesPurchased: courseId } }
            );
            res.json({
                message: "Course purchased successfully"
            });
        } catch (error) {
            res.json({
                message:error
            })
        }
    }
    else{
        res.json({
            msg:"User not found"
        })
    }
    
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers['username'];
    const password = req.headers['password'];

    try {
        const user = await User.findOne({ username: username , password:password });
        if (user) {
            //res.json(user.coursesPurchased);
            Course.find({ courseId: { $in: user.coursesPurchased } })
        .then((courses) => {
        const courseDetails = courses.map(course => ({ courseId: course.courseId, courseTitle: course.title }));
        res.json(courseDetails);
  })
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Error retrieving courses');
    }
});
module.exports = router;