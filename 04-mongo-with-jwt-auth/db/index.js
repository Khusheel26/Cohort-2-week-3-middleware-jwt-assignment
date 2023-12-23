const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://khusheel26:mkhusheel26032003@cluster0.gjq7lof.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username : String,
    password: String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username:String,
    password:String,
    coursesPurchased: Array
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    courseId: Number,
    title:String,
    description:String,
    price:Number,
    imageLink:String,
    published: Boolean,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}