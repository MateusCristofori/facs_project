import { Router } from "express";
import AnswerController from "../controllers/AnswerController/AnswerController";
import AuthUserController from "../controllers/AuthUserController/AuthUserController";
import CommentController from "../controllers/CommentController/CommentController";
import ExamController from "../controllers/ExamController/ExamController";
import QuestionController from "../controllers/QuestionController/QuestionController";
import { tokenValidation } from "../middlewares/tokenValidation";


const privateRouters = Router();

privateRouters.route("/exam")
	.post(tokenValidation, ExamController.createQuestions);

privateRouters.route("/question/:id?")
	.get(tokenValidation, QuestionController.retrieveQuestion)
	.get(tokenValidation, QuestionController.listQuestions)
	.post(tokenValidation, QuestionController.createQuestion)
	.put(tokenValidation, QuestionController.updateQuestion)
	.delete(tokenValidation, QuestionController.deleteQuestion);

privateRouters.route("/answers/:id?")
	.get(tokenValidation, AnswerController.retrieveAnswer)
	.get(tokenValidation, AnswerController.listAnswers)
	.post(tokenValidation, AnswerController.createAnswer)
	.put(tokenValidation, AnswerController.updateAnswer)
	.delete(tokenValidation, AnswerController.deleteAnswer);

privateRouters.route("/comment/:id?")
	.get(tokenValidation, CommentController.retrieveComment)
	.get(tokenValidation, CommentController.listComments)
	.post(tokenValidation, CommentController.createComment)
	.put(tokenValidation, CommentController.updateComment)
	.delete(tokenValidation, CommentController.deleteComment);

// funcional.
privateRouters.route("/logout")
	.post(tokenValidation, AuthUserController.userLogout);


export default privateRouters;