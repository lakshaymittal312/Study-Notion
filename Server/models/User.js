const mongoose = require("mongoose");

// Stores all users of the platform
// Users can be Students, Instructors, or Admins.

const userSchema = new mongoose.Schema({

    // User's first name
    firstName: {
        type: String,
        required: true,
        trim: true,
    },

    // User's last name
    lastName: {
        type: String,
        required: true,
        trim: true,
    },

    // Used for login and identification
    email: {
        type: String,
        required: true,
        trim: true,
    },

    // Encrypted password (hashed using bcrypt)
    password: {
        type: String,
        required: true,
    },

    // Defines role of user
    accountType: {
        type: String,
        enum: ["Admin", "Student", "Instructor"],
        required: true,
    },

    /*
      Links User → Profile

      ref: "Profile"

      One User ---- One Profile

      Stores extra details like gender,
      DOB, contact number etc.
    */
    additionalDetails: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Profile",
    },

    /*
      Links User → Course

      Student enrolled courses OR
      Instructor created courses.

      Ideally this should be an ARRAY because
      one user can have multiple courses.

      One User ---- Many Courses
    */
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    }],

    // Profile picture URL
    image: {
        type: String,
        required: true,
    },

    /*
      Links User → CourseProgress

      Stores progress of courses.

      One User ---- Many CourseProgress

      Ideally this should also be an ARRAY.
    */
    courseProgress: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
    }],
});

module.exports = mongoose.model("User", userSchema);