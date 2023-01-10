import { Router } from "express";
import AnswerController from "../controllers/AnswerController/AnswerController";
import AuthUserController from "../controllers/AuthUserController/AuthUserController";
import CommentController from "../controllers/CommentController/CommentController";
import ExamController from "../controllers/ExamController/ExamController";
import QuestionController from "../controllers/QuestionController/QuestionController";
import { tokenValidation } from "../middlewares/tokenValidation";


const privateRouters = Router();

privateRouters.use(tokenValidation);

privateRouters.route("/exam")
	.get(ExamController.listExams)
	.post(ExamController.createExam);

privateRouters.route("/question/:id?")
	.get(QuestionController.retrieveQuestion)
	.get(QuestionController.listQuestions)
	.post(QuestionController.createQuestion)
	.put(QuestionController.updateQuestion)
	.delete(QuestionController.deleteQuestion);

privateRouters.route("/answers/:id?")
	.get(AnswerController.retrieveAnswer)
	.get(AnswerController.listAnswers)
	.post(AnswerController.createAnswer)
	.put(AnswerController.updateAnswer)
	.delete(AnswerController.deleteAnswer);

privateRouters.route("/comment/:id?")
	.get(CommentController.retrieveComment)
	.get(CommentController.listComments)
	.post(CommentController.createComment)
	.put(CommentController.updateComment)
	.delete(CommentController.deleteComment);

// funcional.
privateRouters.route("/logout")
	.post(AuthUserController.userLogout);


export default privateRouters;