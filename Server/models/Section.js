const mongoose = require("mongoose");

/*
    Represents a chapter/module
    of a course.
*/

const SectionSchema = new mongoose.Schema({

    // Module name
    sectionName:{
        type:String,
    },

    /*
      Links Section → SubSection

      One Section ---- Many SubSections

      Example:
      Section = Arrays
      SubSections = Array Introduction,
                    Array Traversal
    */
    subSection:[
    {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"SubSection",
    }
    ],
});

module.exports = mongoose.model("Section", SectionSchema);