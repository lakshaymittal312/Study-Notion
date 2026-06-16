const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender")
/*
    Stores OTPs temporarily for
    email verification/password reset.
*/

const OTPSchema = new mongoose.Schema({

  // User email
  email:{
    type:String,
    required:true,
  },

  // Generated OTP
  otp:{
    type:String,
    required:true,
  },

  /*
    Creation time.

    expires: 5 * 60

    MongoDB automatically deletes
    this document after 5 minutes
    using TTL Index.
  */
  createdAt:{
    type:Date,
    default:Date.now,
    expires:5*60,
  }
});


//a function -> to send emails
// isko always schema k end me or export se pehle likhte hai
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email from StudyNotion",
            otp
        );
        console.log("Email sent Successfully: ", mailResponse);
    } 
    catch (error) {
        console.log("error occured while sending mails: ", error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
});



module.exports = mongoose.model("OTP", OTPSchema);