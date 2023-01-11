import { Router } from "express";
import AnswerController from "../controllers/AnswerController/AnswerController";
import AuthUserController from "../controllers/AuthUserController/AuthUserController";
import CommentController from "../controllers/CommentController/CommentController";
import ExamController from "../controllers/ExamController/ExamController";
import QuestionController from "../controllers/QuestionController/QuestionController";
import { tokenValidation } from "../middlewares/tokenValidation";


const privateRouters = Router();

privateRouters.use(tokenValidation);

// Métodos de resgatar recursos por ID não estão funcionando como deveriam. Todos eles (aparentemente).
privateRouters.route("/exam/:id?")
	.get(ExamController.listExams)
	.get(ExamController.retrieveExam)
	.post(ExamController.createExam)
	.put(ExamController.updateExam)
	.delete(ExamController.deleteExam);

privateRouters.route("/questions/:id?")
	.get(QuestionController.listQuestions)
	.get(QuestionController.retrieveQuestion)
	.post(QuestionController.createQuestion)
	.put(QuestionController.updateQuestion)
	.delete(QuestionController.deleteQuestion);

privateRouters.route("/answers/:id?")
	.get(AnswerController.listAnswers)
	.get(AnswerController.retrieveAnswer)
	.post(AnswerController.createAnswer)
	.put(AnswerController.updateAnswer)
	.delete(AnswerController.deleteAnswer);

privateRouters.route("/comment/:id?")
	.get(CommentController.listComments)
	.get(CommentController.retrieveComment)
	.post(CommentController.createComment)
	.put(CommentController.updateComment)
	.delete(CommentController.deleteComment);

// funcional.
privateRouters.route("/logout")
	.post(AuthUserController.userLogout);


export default privateRouters;