import { Response } from "express";
import db from "../database/prisma";
import CreateQuestionDTO from "../dtos/CreateQuestionDTO";
import { IRequestWithToken } from "../token/IRequestWithToken";
import { ApiErrors } from "../helpers/errors/ApiErrors";
import errors from "../helpers/errorMessages";


export default class QuestionController {
	async retrieveQuestion (req: IRequestWithToken, res: Response) {
		const {id} = req.params;
		if (!id) {
			return res.status(404).json({
				error: "questão não encontrada"
			});
		}
		const question = await db.question.findFirst({
			where: {id}
		});
		return res.status(200).json({
			question
		});
	}
      
	async listQuestions(_: IRequestWithToken, res: Response)  {
		const questions = await db.question.findMany();
		return res.status(200).json({
			questions
		});

	}
    
	async createQuestion (req: IRequestWithToken, res: Response) {
		if (!req.token) {
			return res.status(400).json({
				
			});
		}
		const author = await db.user.findFirst({
			where: {
				id: req.token.user.id
			}
		});
		if (!author) {
			return res.status(404).json({
				error: errors.userNotFound
			});
		}
		const { content, examId }: CreateQuestionDTO = req.body;
		const newPost = await db.post.create({
			data: {
				authorId: author.id,
				content
			}
		});
		if (!newPost) {
			return res.status(400).json({
				error: errors.couldNotCreatePost
			});
		}
		const newQuestion = await db.question.create({
			data: {
				postId: newPost.id,
				examId,
			}
		});
		if (!newQuestion) {
			return res.status(400).json({
				error: "não foi possível criar uma questão com as informações enviadas"
			});
		}
		return res.status(201).json({
			newQuestion
		});
	}
    
	async updateQuestion (req: IRequestWithToken, res: Response) {
		if (!req.token) {
			return res.status(403).json({
				error: errors.token
			});
		}
		const question = await db.question.findFirst({
			where: {
				id: req.params.id
			},
			include: {
				post: true
			}
		});
		if (!question) {
			return res.status(404).json({
				error: errors.questionNotFound
			});
		}
		const author = await db.user.findFirst({
			where: {
				id: req.token.user.id
			}
		});
		if (!author) {
			return res.status(404).json({
				error: errors.userNotFound
			});
		}
		if (question.post.authorId !== author.id ) {
			return res.status(403).json({
				error: "somente o autor da pergunta pode modifica-la"
			});
		}
		const { answerId }: { answerId: string } = req.body;

		const updatedQuestion = await db.question.update({
			where: {
				id: question.id
			},
			data: {
				answerId
			}
		});
		return res.status(200).json({
			updatedQuestion
		});
	}
    
	async deleteQuestion(req: IRequestWithToken, res: Response) {
		if (!req.token) {
			return res.status(403).json({
				error: errors.token
			});
		}
		const question = await db.question.findFirst({
			where: {
				id: req.params.id
			},
			include: {
				post: true
			}
		});
		if (!question) {
			return res.status(404).json({
				error: "questão não encontrada"
			});
		}
		const author = await db.user.findFirst({
			where: {
				id: req.token.user.id
			}
		});
		if (!author) {
			return res.status(404).json({
				error: errors.userNotFound
			});
		}
		if (question.post.id !== author.id ) {
			return res.status(403).json({
				error: "somente o autor da pergunta pode modifica-la"
			});
		}
		const deletedQuestion = await db.question.delete({
			where: {
				id: question.id
			}
		});
		return res.status(202).json({
			deletedQuestion
		});
		
	}
}
