const jwt=require("jsonwebtoken");
require("../db/conn")
const User=require("../model/userSchema");

const Authenticate= async(req,res,next)=>{
  try{
    console.log(req.cookies)
      const token=req.cookies.jwtoken;
      console.log(token)
      const verifyToken=await jwt.verify(token, process.env.SECRET_KEY);
      console.log(verifyToken._id)
      // const userExist = await User.findOne({ email: "grinknhvshdloo@gmail.com" });
      // console.log(userExist)
      // const abc=await User.findOne({name:"kshipra"});
      // console.log(abc)
      const rootUser=await User.findById(verifyToken._id)
      // const rootUser=await User.findOne({_id:verifyToken._id});
      if (!rootUser){throw new Error('User not Found')}
      req.token=token;
      req.rootUser=rootUser;
      req.userID =rootUser._id;

      return next()
  }
  catch(err){
    res.status(401).send('Unauthorized : No token provided')
      console.log(err);
  }
}
module.exports=Authenticate;