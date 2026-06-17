const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator")

// send otp

exports.sendOTP = async (req,res) => {

   try{
     // fetch email from request ki body
    const {email} = req.body;

    // check if user already exists
    const checkUserPresent = await User.findOne({email});

    // if user already exist , then return a response
    if(checkUserPresent){
        return res.status(401).json({
            success:false,
            message:"User already registered",
        })
    }

    // generate otp
    var otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    console.log("otp generator is :",otp)

    // check unique otp or not
    const result = await OTP.findONe({otp:otp});

    while(result){
        otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    });
    result = await OTP.findONe({otp:otp});
    }

    const otpPayload = {email,otp};

    // create an entry for otp
    const otpBody = await OTp.create(otpPayload);
    console.log(otpBody);

    // return response successful
    res.status(200).json({
        success:true,
        message:"OTP sent successfully",
        otp,
    })
   }
   catch(error){
      console.log(error);
      return res.status(500).json({
        success:false,
        messgae:error.message,
      })
   }

}


// signup
exports.signUp = async(req,res) => {

    try{
      // data fetch from request ki body
    const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp} = req.body;

    // validation of data
    if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
        return res.status(403).json({
            success:false,
            messgae:"All fields are required",
        })
    }

    // dono password match karlo
    if(password !== confirmPassword){
        return res.status(400).json({
            success:false,
            messgae:"Password and confirm password do not match. Please try again",
        })
    }

    // check user already exists or not
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({
            success:false,
            messgae:"User is already registered",
        });
    }

    // find most recent otp
    const recentOtp = (await OTP.find({email})).toSorted({createdAt:-1}).limit(1);
    console.log(recentOtp);

    // validation of otp
    if(recentOtp.length == 0){
        // otp not found
        return res.status(400).json({
            success:false,
            messgae:"OTP Not Found",
        })
    } else if(otp !== recentOtp.otp){
        // Invalid otp
        return res.status(400).json({
            success:false,
            message:"Invalid OTP",
        })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password,10);

    // entry create in DB

    const profileDetails = await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null,
    });

    const user = await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    })

    // return response
    return res.status(200).json({
        success:true,
        message:"User is registered successfully",
        user,
    })

    }
    catch(error){
       console.log(error);
      return res.status(500).json({
        success:false,
        messgae:"User cannot be registered. Pllease try again",
      })
    }
}