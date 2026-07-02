const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");


// create rating
exports.createRating = async (req,res) => {
    try{

        // get user id
        const userId = req.user.id;

        // fetchdata from req body
        const {rating , review , courseId} = req.body;

        // check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {_id:courseId,
                studentsEnrolled:{$elemMatch:{$eq:userId}},
            }
        );

        if(!courseDetails){
            return res.status(404).json({
                success:"false",
                message:"Student is not enrolled in this course",
            });
        }

        // check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId
        });

        if(alreadyReviewed){
            return res.status(403).json({
                success:"false",
                message:"Course is already reviewed by the course",
            });
        }

        // create rating and review
        const ratingReview = await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId,
        });

        // update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReview,
                }
            },
            {new:true}
        );

        console.log(updatedCourseDetails);

        // return response
        return res.status(200).json({
            success:true,
            message:"Rating and review created successfully",
            ratingReview,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Rating and review not created successfully",
        });
    }
};


// average rating

exports.getAverageRating = async (req,res) => {
    try{
        // get course id
        const courseId = req.body.courseId;

        // calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])
        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            });
        }

        // if no avg. rating
         return res.status(200).json({
                success:true,
                message:"Average rating is 0, no rating given till now",
                averageRating: 0,
            }); 
    }
    catch(error){
        console.log(error);
         return res.status(500).json({
                success:false,
                message:error.message,
            });
    }
}


// get all rating

exports.getAllRating = async (req,res) => {
    try{
        //const all Reviews = 

    }
    catch(error){
         return res.status(500).json({
                success:false,
                message:error.message,
            })

    }
}