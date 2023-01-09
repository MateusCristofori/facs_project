import { IRequestWithToken } from "../../token/IRequestWithToken";
import { Response } from "express";
import db from "../../database/prisma";
import { createPost } from "../../helpers/create_post/createPosts";
import { CreateaAnswerDTO } from "../../dtos/CreateAnswerDTO";

class AnswersController {
	async retrieveAnswer(req: IRequestWithToken, res: Response) {
		const id = req.params.id;

		if(!id) {
			return res.status(404).json({msg: "O id da pergunta deve ser válido!"});
		}

		const answer = await db.answer.findFirst({
			where: { id },
			include: {
				Question: true
			}
		});

		if(!answer) {
			return res.status(404).json({msg: "Questão não encontrada!"});
		}
  
		return res.status(200).json(answer);
	}

	async listAnswers(req: IRequestWithToken, res: Response) {
		const answers = await db.answer.findMany({
			include: {
				user: true
			}
		});

		return res.status(200).json(answers);
	}

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
		const newPost = createPost(author_id, content);

		const newAnswer = await db.answer.create({
			data: {
				userId: author_id,
				postId: (await newPost).id,
				questionId: questionId
			}
		});

		return res.status(201).json(newAnswer);
	}

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

		const { answerId, questionId } = req.body;

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
			return res.status(403).json({msg: "Apenas o usuário que criou a resposta pode alterá-la"});
		}

		const updatedAnswer = await db.answer.update({
			where: { id: answerId },
			data: {
				questionId
			}
		});

		return res.status(200).json(updatedAnswer);
	}

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

		const { answerId } = req.body;

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

		return res.status(200).json({msg: "Resposta deletada."});
	}
}

export default new AnswersController();