import { Router } from "express";
import AnswerController from "../controllers/AnswerController";
import AuthUserController from "../controllers/AuthUserController";
import CommentController from "../controllers/CommentController";
import ExamController from "../controllers/ExamController";
import QuestionController from "../controllers/QuestionController";
import { tokenValidation } from "../middlewares/tokenValidation";


const privateRouters = Router();

privateRouters.use(tokenValidation);

// ----- // 
const examController = new ExamController();
const questionController = new QuestionController();
const commentController = new CommentController();
const authUserController = new AuthUserController();
const answerController = new AnswerController();


// Métodos de resgatar recursos por ID não estão funcionando como deveriam. Todos eles (aparentemente).
privateRouters.route("/exam")

	.get(examController.listExams)

	.post(examController.createExam)

	.put(examController.updateExam)

	.delete(examController.deleteExam);

	privateRouters.route("/exam/:id")
		.get(examController.retrieveExam);
		

privateRouters.route("/questions")

	.get(questionController.listQuestions)

	.post(questionController.createQuestion)

	.put(questionController.updateQuestion)

	.delete(questionController.deleteQuestion);

	privateRouters.route("/questions/:id")
		.get(questionController.retrieveQuestion);


privateRouters.route("/answers")

	.get(answerController.listAnswers)

	.post(answerController.createAnswer)

	.put(answerController.updateAnswer)

	.delete(answerController.deleteAnswer);

	privateRouters.route("/answers/:id")
		.get(answerController.retrieveAnswer);
	

privateRouters.route("/comment/")

	.get(commentController.listComments)

	.get(commentController.retrieveComment)

	.post(commentController.createComment)

	.put(commentController.updateComment)

	.delete(commentController.deleteComment);

	privateRouters.route("/comment/:id")
		.get(commentController.retrieveComment);


privateRouters.route("/logout")

	.post(authUserController.userLogout);

export default privateRouters;
