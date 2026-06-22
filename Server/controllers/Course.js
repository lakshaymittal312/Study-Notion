const Course = require("../models/Course");
const Tags = require("../models/Tags");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploader");


// create course handler function
exports.createCourse = async (req,res) => {
    try{

        // fetch data 
        const {courseName , courseDescription , whatYouWillLearn , price , tag} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseNmae || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success:false,
                message:"All fields are required",
            });
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor details:",instructorDetails);

        if(!instructorDetails)
        {
            return res.status(404).json({
                success:false,
                message:"Instructor Details not found",
            });
        }

        // check given tag is valid or not
        const tagDetails = await Tags.findById(tag);
        if(!tagDetails){
             return res.status(404).json({
                success:false,
                message:"Tag Details not found",
            });
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url,
        })
      
    }
    catch(error)
    {

    }
}