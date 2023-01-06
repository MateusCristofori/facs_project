import { Router } from "express";
import { UserPublicController } from "../controllers/UserPublicController";

const publicRouters = Router();

publicRouters.route("/users")
	.get(UserPublicController.getAllUsersHandler) // get all Users
	.post(UserPublicController.registerNewUserHandler); // create User

publicRouters.route("/login")
	.post(UserPublicController.userLoginHandler); // log in

export default publicRouters;