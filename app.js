import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/error.js";
import cors from "cors";
//to use route that we made in user

export const app = express();

//use middleWare for getData from postman!  // this use before the make router..
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], //we can give specific domain , that only take accept the request from that specific domain
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true, //for get header details like cookie...
  })
); //for deployment

//made prefix route so now we not have to write again and again same path for user/...
app.use("/users", userRouter);
app.use("/task", taskRouter);

config({
  path: "./data/config.env",
});

//using error middleware
app.use(errorMiddleWare);
