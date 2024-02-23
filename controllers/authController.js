import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = async (req, res, next) => {
  // console.log(req.body);
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({ ...req.body, password: hashedPassword });
    console.log(newUser);
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (user) {
      const validatePassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (validatePassword) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT, {
          expiresIn: "1d",
        });
        return res.cookie("userToken", token ,  { 
          httpOnly: true, // Cannot be accessed by client-side scripts
        }).status(200).json(user._doc);
      } else {
        return res.status(403).json("Forbidden");
      }
    } else {
      return res.status(404).json("Not Found!!");
    }
  } catch (error) {
    next(error);
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "royshovon853@gmail.com",
    pass: "tvtonidzglyyllgl",
  },
});

export const sendLink = async (req, res, next) => {
  console.log(process.env.EMAIL , process.env.PASSWORD);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT, {
        expiresIn: "120s",
      });
      const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Sending link For password reset",
        text: `PASSWORD RESET LINK http://localhost:5173/api/auth/resetPassword/${user._id}/${token}`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("LINE AT 65", error);
          return res.status(400).json(error);
        } else {
          console.log("LINE AT 69", info);
          return res.status(201).json(info);
        }
      });
    } else {
      return res.status(403).json("Not Found!!");
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  console.log(req.body , req.params.id);
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
    if (user) {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      const resetPassword = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { password: hashedPassword },
        },
        { new: true }
      );
      console.log(resetPassword);
      return res.status(200).json(resetPassword);
    } else {
      return res.status(400).json("Not Found!!");
    }
  } catch (error) {
    next(error);
  }
};
