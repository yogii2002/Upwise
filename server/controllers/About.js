const Category = require("../models/Category")
const Course = require("../models/Course")
const User = require("../models/User")
exports.getAllStats = async (req, res) => {
  try {
    const [numOfStudents, numOfInstructors, numOfCourses, numOfCategories] = await Promise.all([
      User.countDocuments({ accountType: "Student" }),
      User.countDocuments({ accountType: "Instructor" }),
      Course.countDocuments(),
      Category.countDocuments()
    ]);

    return res.status(200).json({
      success: true,
      data: [
        { count: numOfStudents, label: "Active Students" },
        { count: numOfInstructors, label: "Active Instructors" },
        { count: numOfCourses, label: "Active Courses" },
        { count: numOfCategories, label: "Variety of Courses" },
      ]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching stats",
      error: error.message
    });
  }
};
