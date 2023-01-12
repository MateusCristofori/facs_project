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
privateRouters.route("/exam/:id?")

	.get(examController.listExams)

	.get(examController.retrieveExam)

	.post(examController.createExam)

	.put(examController.updateExam)

	.delete(examController.deleteExam);

privateRouters.route("/questions/:id?")
	.get(questionController.listQuestions)

	.get(questionController.retrieveQuestion)

	.post(questionController.createQuestion)

	.put(questionController.updateQuestion)

	.delete(questionController.deleteQuestion);

privateRouters.route("/answers/:id?")

	.get(answerController.listAnswers)

	.get(answerController.retrieveAnswer)

	.post(answerController.createAnswer)

	.put(answerController.updateAnswer)

	.delete(answerController.deleteAnswer);

privateRouters.route("/comment/:id?")

	.get(commentController.listComments)

	.get(commentController.retrieveComment)

	.post(commentController.createComment)

	.put(commentController.updateComment)

	.delete(commentController.deleteComment);

// funcional.
privateRouters.route("/logout")

	.post(authUserController.userLogout);


export default privateRouters;