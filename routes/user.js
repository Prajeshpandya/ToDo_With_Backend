import express from "express";
import {
  register,
  getUserById,
  login,
  logout,
} from "../controllers/user.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();

// prefix route is -> /users

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me",isAuth , getUserById);
// router.route("/userid/:id").get(getUserById);

export default router;
