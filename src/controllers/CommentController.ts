import { IRequestWithToken } from "../token/IRequestWithToken";
import db from "../database/prisma";
import { BadRequestError, NotFoundError } from "../helpers/errors/ApiErrors";
import { Response } from "express";

class CommentController {
	async retrieveComment(req: IRequestWithToken, res: Response)  {
		const comment_id = req.params.id;

		const comment = await db.comment.findFirst({
			where: { id: comment_id }
		});

		if(!comment) {
			throw new NotFoundError("Comentário não encontrado");
		}

		res.status(200).json(comment);
	}
  
	async listComments(req: IRequestWithToken, res: Response) {
		const allComments = await db.comment.findMany({});

		res.status(200).json(allComments);
	}

	async createComment(req: IRequestWithToken, res: Response) {
		return;
	}
	
	async updateComment() {
		return;
	}

	async deleteComment() {
		return;
	}
}

export default new CommentController();