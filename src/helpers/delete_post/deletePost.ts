import db from "../../database/prisma"

export const deletePost = async (id: string) => {
  return await db.post.delete({
    where: {
      id: id
    }
  });
}