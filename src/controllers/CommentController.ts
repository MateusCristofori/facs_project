import { Response } from "express";
import db from "../database/prisma";
import { createCommentDTO } from "../dtos/CreateCommentDTO";
import { createPost } from "../helpers/create_post/createPosts";
import { IRequestWithToken } from "../token/IRequestWithToken";

export default class CommentController {
	// Todos os métodos de buscar por ID e listagem de recursos devem ser revisados. Mau funcionamento.
	async retrieveComment(req: IRequestWithToken, res: Response)  {
		const comment_id = req.params.id;

		const comment = await db.comment.findFirst({
			where: { id: comment_id }
		});

		if(!comment) {
			return res.status(404).json({error: "Comentário não encontrado!"});
		}

		res.status(200).json({ comment });
	}
	
	// Todos os métodos de buscar por ID e listagem de recursos devem ser revisados. Mau funcionamento.
	async listComments(req: IRequestWithToken, res: Response) {
		const allComments = await db.comment.findMany({
			include: {
				post: true,
				Answer: true
			}
		});

		res.status(200).json({ allComments });
	}

	// Funcional.
	async createComment(req: IRequestWithToken, res: Response) {
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

		const { content, answerId }: createCommentDTO = req.body;

		const answer = await db.answer.findFirst({
			where: { id: answerId },
			include: {
				post: true
			}
		});

		if(!answer) {
			return res.status(404).json({error: "A resposta não existe!"});
		}

		const newPost = await createPost(author_id, content);

		const newComment = await db.comment.create({
			data: {
				answerId: answerId,
				postId: newPost.id
			},
			include: {
				post: true
			}
		});

		res.status(201).json({ newComment });
	}
	
	// Aparentemente funcional. Revisão recomendada.
	async updateComment(req: IRequestWithToken, res: Response) {
		if(!req.token) {
			return res.status(403).json({error: "Token de autorização inválido!"});
		}		
		
		const author_id = req.token.user.id;

		const author = await db.user.findFirst({
			where: { id: author_id }
		});

		if(!author) {
			return res.status(404).json({error: "Usuário não encontrado!"});
		}

		const comment_id = req.params.id;

		if(!comment_id) {
			return res.status(404).json({error: "ID do comentário necessário!"});
		}

		const comment = await db.comment.findFirst({
			where: { id: comment_id },
			include: {
				post: true
			}
		});

		if(!comment) {
			return res.status(404).json({error: "Comentário não encontrado!"});
		}

		if(comment.post.authorId !== author.id) {
			return res.status(403).json({error: "Apenas o criador do comentário pode alterá-lo!"});
		}

		const { content, answerId }: createCommentDTO = req.body;

		const answer = await db.answer.findFirst({
			where: { id: answerId },
			include: {
				post: true
			}
		});

		if(!answer) {
			return res.status(404).json({error: "A resposta não existe!"});
		}
		
		const updatedComment = await db.post.update({
			where: { id: comment.postId },
			data: {
				content
			},
			include: {
				Answer: true,
			}
		});

		return res.status(200).json({ updatedComment });
	}

	// Funcional.
	async deleteComment(req: IRequestWithToken, res: Response) {
		if(!req.token) {
			return res.status(403).json({error: "Token de autorização inválido!"});
		}

		const comment_id = req.params.id;

		if(!comment_id) {
			return res.status(404).json({error: "Comentário não encontrado!"});
		}

		const deletedComment = await db.comment.delete({
			where: { id: comment_id },
			include: {
				post: true
			}
		});

		if(!deletedComment) {
			return res.status(404).json({error: "Comentário não encontrado!"});
		}

		res.status(200).json({ deletedComment });
	}
}