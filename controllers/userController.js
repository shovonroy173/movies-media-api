import User from "../models/User.js";

export const getUser = async(req , res , next)=>{
    // console.log("LINE AT 4 in userController" , req.params.email);

    try {
        const user = await User.findOne({email:req.params.email});
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}