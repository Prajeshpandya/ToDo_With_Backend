import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const register = async (req, res,next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("user already exist!", 400));

    // if (user) {
    //   return res.status(404).json({
    //     success: "false",
    //     message: "user already exist!",
    //   });
    // }

    const hashedpassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedpassword });

    sendCookie(user, res, "registered successfully!", 201);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // +password bcz we do select false in model of the user ... so we can not access the password like user.password!
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid email or password!", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid email or password!", 400));

    sendCookie(user, res, `Welcome Back ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const getUserById = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none", //if its STRICT that means the url of frontend and backend will be same always but we have to do frontend and backend sepratly so.. its none!
      secure: process.env.NODE_ENV === "Development" ? "false" : "true", //if we do samesite none then we have to do secure true!
    })
    .json({
      success: true,
    });
};
