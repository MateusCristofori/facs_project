import { Router } from "express";
import AnswersController from "../controllers/AnswerController";
import UserPublicController from "../controllers/UserPublicController";

const publicRouters = Router();

const answersController = new AnswersController();

publicRouters.route("/users")
	.post(UserPublicController.registerNewUserHandler); // create User

publicRouters.route("/login")

	.post(userPublicController.userLoginHandler); // log in

publicRouters.route("/answers")
	.post(answersController.listAnswers);

publicRouters.route("/answers/:d")
	.post(answersController.retrieveAnswer);

export default publicRouters;