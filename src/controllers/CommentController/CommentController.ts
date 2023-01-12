import { Response } from "express";
import db from "../../database/prisma";
import { createCommentDTO } from "../../dtos/CreateCommentDTO";
import { createPost } from "../../helpers/create_post/createPosts";
import { IRequestWithToken } from "../../token/IRequestWithToken";

class CommentController {
	async retrieveComment(req: IRequestWithToken, res: Response)  {
		const comment_id = req.params.id;

		const comment = await db.comment.findFirst({
			where: { id: comment_id }
		});

		if(!comment) {
			return res.status(404).json({error: "Comentário não encontrado!"});
		}

		res.status(200).json(comment);
	}
  
	async listComments(req: IRequestWithToken, res: Response) {
		const allComments = await db.comment.findMany({});

		res.status(200).json(allComments);
	}

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

		const { content }: createCommentDTO = req.body;

		const newPost = createPost(author_id, content);

		const newComment = await db.comment.create({
			data: {
				postId: (await newPost).id
			}
		});

		res.status(201).json(newComment);
	}
	
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
			return res.status(404).json({error: "Comentário não encontrado!"});

		}

		const { content }: createCommentDTO = req.body;

		const updatedComment = await db.comment.update({
			where: {id: comment_id},
			data: {
				post: {
					create: {
						authorId: author_id,
						content
					}
				}
			}
		});

		res.status(200).json(updatedComment);
	}

	async deleteComment(req: IRequestWithToken, res: Response) {
		const comment_id = req.params.id;

		if(!comment_id) {
			return res.status(404).json({error: "Comentário não encontrado!"});
		}

		const comment = await db.comment.delete({
			where: { id: comment_id }
		});

		res.status(200).json({msg: "Comentário deletado!"});
	}
}

export default new CommentController();