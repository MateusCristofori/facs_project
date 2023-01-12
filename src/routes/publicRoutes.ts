import { Router } from "express";
import UserPublicController from "../controllers/UserPublicController";

const publicRouters = Router();

const userPublicController = new UserPublicController();

publicRouters.route("/register")

	.post(userPublicController.registerNewUserHandler); // create User

publicRouters.route("/login")

	.post(userPublicController.userLoginHandler); // log in

export default publicRouters;