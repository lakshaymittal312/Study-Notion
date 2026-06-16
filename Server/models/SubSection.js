const mongoose = require("mongoose");

/*
    Represents a single lecture/video
    inside a section.
*/

const subSectionSchema = new mongoose.Schema({

    // Lecture title
    title: {
        type: String,
    },

    // Video duration
    timeDuration: {
        type: String,
    },

    // Lecture description
    description: {
        type: String,
    },

    // Cloudinary/video URL
    videoUrl: {
        type: String,
    },
});

module.exports = mongoose.model("SubSection", subSectionSchema);