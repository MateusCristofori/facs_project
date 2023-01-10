import db from "../../database/prisma";
import { BadRequestError } from "../errors/ApiErrors";

export const createPost = async (author_id: string, content: string) => {

	if(!author_id || !content) {
		throw new BadRequestError("Informações inválidas!");
	}

	return db.post.create({
		data: {
			authorId: author_id,
			content
		}
	});
};