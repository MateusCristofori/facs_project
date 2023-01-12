import { Response } from "express";
import db from "../../database/prisma";
import { createPost } from "../../helpers/create_post/createPosts";
import { IRequestWithToken } from "../../token/IRequestWithToken";

class ExamController {
	async createQuestions(req: IRequestWithToken, res: Response) {
		if(!req.token) {
			return res.status(403).json({error: "Token de validação inválido!"});
		}
	
		const author_id = req.token.user.id;

		const author = await db.user.findFirst({
			where: { id: author_id }
		});

		if(!author) {
			return res.status(404).json({error: "Usuário não encontrado!"});
		}

		const { content, examId } = req.body;

		const newPost = createPost(author_id, content);

		const newQuestion = await db.question.create({
			data: {
				examId,
				postId: (await newPost).id
			}
		});

		res.status(201).json(newQuestion);
	}
}

export default new ExamController();