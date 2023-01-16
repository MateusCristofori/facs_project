import db from "../../database/prisma";

export const createPost = async (author_id: string, content: string) => {
	return await db.post.create({
		data: {
			authorId: author_id,
			content
		}
	});
};