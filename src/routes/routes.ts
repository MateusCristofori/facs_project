import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();

router.route("/users")
	.get() // get Users
	.post(); // create User

router.route("/login")
	.post(UserController.loginHandler); // log in