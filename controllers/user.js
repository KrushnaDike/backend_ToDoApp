import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async(req, res)=>{
    try {
        const users = await User.find();
    
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        next(error);
    }
} ;

export const login = async(req, res)=> {
    try {
        const {name, email, password} = req.body;
    
        const user = await User.findOne({email}).select("+password");
        if(!user) return next(new ErrorHandler("Invalid Email or Password!", 400));
    
        const isMatch = await bcrypt.compare(password, user.password); //user.password means hashedPassword
        if(!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid Email or Password!",
            });
        }
    
        // set cookie for login
        sendCookie(user, res, 200, `${user.name}, Logged in Successfully!`);
    } catch (error) {
        next(error);
    }
} ;

export const register = async(req, res)=>{
    try {
        const {name, email, password} = req.body;
    
        let user = await User.findOne({email});
    
        if(user) return next(new ErrorHandler("User Already Exists!", 400));
        // if(user) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "User Already Exists!",
        //     });
        // }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({name, email, password: hashedPassword});
    
        // set cookie for register with login
        sendCookie(user, res, 201, "Registered Succesfully!");
    } catch (error) {
        next(error);
    }
} ;

export const getMyProfile = (req, res)=> {

    res.status(200).json({
        success: true,
        user: req.user,
    });

};

export const logout = (req, res)=> {

    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
    });

};

