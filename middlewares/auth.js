import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: "false",
      message: "Login first!",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   So, yes, you can set values to req.anything. This is commonly done in middleware functions or route handlers to pass data between middleware functions or to make data available to subsequent handlers in the request-response cycle.

  req.user = await User.findById(decoded._id);

  next();
  
};
