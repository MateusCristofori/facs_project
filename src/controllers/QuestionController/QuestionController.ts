import { Response } from "express";
import db from "../../database/prisma";
import { createPost } from "../../helpers/create_post/createPosts";
import { IRequestWithToken } from "../../token/IRequestWithToken";

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
      
	async listQuestions(req: IRequestWithToken, res: Response)  {
		const questions = await db.question.findMany();
		return res.status(200).json({
			questions
		});
	}
    
	async createQuestion (req: IRequestWithToken, res: Response) {
		if (!req.token) {
			return res.status(403).json({error: "token de autorização não encontrado."});
		}
		
		const author_id = req.token.user.id;

		const author = await db.user.findFirst({
			where: {
				id: author_id
			}
		});
		
		if(!author) {
			return res.status(404).json({error: "Usuário não encontrado!"});
		}

		const { content, examId } = req.body;

		const newPost = createPost(author_id, content);

		const newQuestion = await db.question.create({
			data: {
				postId: (await newPost).id,
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
			return res.status(403).json({error: "Token de validação não encontrado!"});
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
			return res.status(404).json({ error: "Questão não encontrada!" });
		}

		const author = await db.user.findFirst({
			where: {
				id: req.token.user.id
			}
		});

		if (!author) {
			return res.status(404).json({ error: "Usuário não encontrado!" });
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
			return res.status(403).json({ error: "Token de autorização inválido!" });
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
			return res.status(404).json("Questão não encontrada!");
		}

		const author = await db.user.findFirst({
			where: {
				id: req.token.user.id
			}
		});

		if (!author) {
			return res.status(404).json("Usuário não encontrado!");
		}

		if (question.post.authorId !== author.id ) {
			return res.status(403).json({ error: "Somente o autor da pergunta pode modifica-la." });
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
