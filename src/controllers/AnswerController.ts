import { IRequestWithToken } from "../token/IRequestWithToken";
import { Response } from "express";
import db from "../database/prisma";
import { createPost } from "../helpers/create_post/createPosts";
import { CreateaAnswerDTO }  from "../dtos/CreateAnswerDTO";

export default class AnswersController {
	async retrieveAnswer(req: IRequestWithToken, res: Response) {
		if(!req.token) {
			return res.status(403).json({ error: "Token de validação inválido!" });
		}
		
		const id = req.params.id;

		if(!id) {
			return res.status(404).json({msg: "O id da pergunta deve ser válido!"});
		}

		const answer = await db.answer.findFirst({
			where: { id },
			include: {
				Question: true,
				Comment: true,
				post: true,
			},
		});

		if(!answer) {
			return res.status(404).json({msg: "Questão não encontrada!"});
		}
  
		return res.status(200).json({ answer });
	}

	async listAnswers(req: IRequestWithToken, res: Response) {
		const answers = await db.answer.findMany({
			include: {
				post: true,
				Comment: true,
				Question: true
			},
		});

		return res.status(200).json({ answers });
	}

	// Funcional.
	async createAnswer(req: IRequestWithToken, res: Response) {
		if(!req.token) {
			return res.status(403).json({msg: "Token de autorização inválido!"});
		}

		const author_id = req.token.user.id;

		const author = await db.user.findFirst({
			where: { id: author_id }
		});
	
		if(!author) {
			return res.status(404).json({msg: "Usuário não encontrado!"});
		}

		const { content, questionId }: CreateaAnswerDTO = req.body;
		const newPost = await createPost(author_id, content);

		const newAnswer = await db.answer.create({
			data: {
				userId: author_id,
				postId: newPost.id,
				questionId: questionId
			},
			include: {
				Question: true
			}
		});

		return res.status(201).json({ newAnswer });
	}

	// Funcional
	async updateAnswer(req: IRequestWithToken, res: Response) {
		if(!req.token) {
			return res.status(403).json({msg: "Token de autorização inválido!"});
		}

		const author_id = req.token.user.id;

		const author = await db.user.findFirst({
			where: { id:  author_id }
		});

		if(!author) {
			return res.status(404).json({msg: "Usuário não encontrado!"});
		}
		
		const answer_id = req.params.id;
		
		if(!answer_id) {
			return res.status(404).json({error: "Resposta não encontrada!"});
		}

		const answer = await db.answer.findFirst({
			where: { id: answer_id },
			include: {
				post: true
			}
		});

		if(!answer) {
			return res.status(404).json({msg: "Resposta não encontrada!"});
		}

		if(answer.post.authorId !== author.id) {
			return res.status(403).json({msg: "Apenas o usuário que criou a resposta pode alterá-la"});
		}

		const {  questionId, content } = req.body;

		const question = await db.question.findFirst({
			where: { id: questionId },
			include: {
				post: true
			}
		});

		if(!question) {
			return res.status(404).json({error: "Questão não encontrada!"});
		}

		const updatedQuestion = await db.post.update({
			where: { id: answer.postId },
			data: {
				content
			}
		});
		
		return res.status(200).json({ updatedQuestion });
	}

	// Funcional.
	async deleteAnswer(req: IRequestWithToken, res: Response) {
		if(!req.token) {
			return res.status(403).json({msg: "Token de autorização inválido!"});
		}

		const author_id = req.token.user.id;
		const author = await db.user.findFirst({
			where: { id: author_id }
		});

		if(!author) {
			return res.status(404).json({msg: "Usuário não encontrado!"});
		}

		const answerId  = req.params.id;

		const answer = await db.answer.findFirst({
			where: { id: answerId },
			include: {
				post: true
			}
		});

		if(!answer) {
			return res.status(404).json({msg: "Resposta não encontrada!"});
		}

		if(answer.post.authorId !== author.id) {
			return res.status(403).json({msg: "Apenas o criador da resposta que pode alterá-la."});
		}

		const deletedAnswer = await db.answer.delete({
			where: { id: answerId },
			include: {
				post: true
			}
		});

		return res.status(200).json({ deletedAnswer });
	}
}
