import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: "true",
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none", //if its STRICT that means the url of frontend and backend will be same always but we have to do frontend and backend sepratly so.. its none!
      secure: process.env.NODE_ENV === "Development" ? "false" : "true", //if we do samesite none then we have to do secure true!
    })
    .json({
      success: true,
      message,
    });
};
