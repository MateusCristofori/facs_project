import { Router } from "express";
import AnswersController from "../controllers/AnswerController";
import UserPublicController from "../controllers/UserPublicController";

const publicRouters = Router();

const answersController = new AnswersController();

publicRouters.route("/users")
	.post(UserPublicController.registerNewUserHandler); // create User

publicRouters.route("/login")
	.post(UserPublicController.userLoginHandler); // log in

publicRouters.route("/answers")
	.get(answersController.listAnswers);

publicRouters.route("/answers/:d")
	.get(answersController.retrieveAnswer);

export default publicRouters;