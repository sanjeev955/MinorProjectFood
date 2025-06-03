import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const userRouter = express.Router(); // Middleware can be added here for route protection

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

export default userRouter;
