import { Response } from "express";
import db from "../database/prisma";
import { CreateExamDTO } from "../dtos/CreateExamDTO";
import { createPost } from "../helpers/create_post/createPosts";
import { IRequestWithToken } from "../token/IRequestWithToken";

export default class ExamController {
	// Não funcional.
	async retrieveExam(req: IRequestWithToken, res: Response) {
		if(!req.token) {
			return res.status(403).json({msg: "Token de autorização inválido!"});
		}

		const id = req.params.id;

		const exam = await db.exam.findFirst({
			where: { id: id },
			include: {
				questions: true
			}
		});

		if(!exam) {
			return res.status(404).json({msg: "Prova não encontrada!"});
		}

		return res.status(200).json({exam});
	}

	// Funcional.
	async listExams(req: IRequestWithToken, res: Response) {		
		if(!req.token) {
			return res.status(403).json({msg: "Token de autorização inválido!"});
		}

		const exams = await db.exam.findMany({
			include: {
				post: true,
				questions: true,
			},
		});

		if(!exams) {
			return res.status(404).json({ error: "Nenhuma prova foi encontrada!" });
		}

		return res.status(200).json({exams});
	}

	// Funcional.
	async createExam(req: IRequestWithToken, res: Response) {
		if(!req.token) {
			return res.status(403).json({msg: "Token de autorização inválido!"});
		}

		const author_id = req.token.user.id;

		const author = await db.user.findFirst({
			where: { id: author_id },
			include: {
				Post: true
			}
		});

		if(!author) {
			return res.status(404).json({msg: "Usuário não encontrado!"});
		}

		const { content }: CreateExamDTO  = req.body;

		const newPost = await createPost(author_id, content);

		const newExam = await db.exam.create({
			data: {
				postId: newPost.id
			},
			include: {
				post: true
			}
		});

		return res.status(201).json({newExam});
	}

	// Funcional.
	async updateExam(req: IRequestWithToken, res: Response) {
		if(!req.token) {
			return res.status(200).json({msg: "Token de autorização inválido."});
		}
	
		const author_id = req.token.user.id;	
	
		const author = await db.user.findFirst({
			where: { id: author_id },
			include: {
				Post: true
			}
		});
	
		if(!author) {
			return res.status(204).json({msg: "Usuário não encontrado!"});
		}
		
		const { examId, content } = req.body;

		const exam = await db.exam.findFirst({
			where: { id: examId },
			include: {
				post: true
			}
		});

		if(!exam) {
			return res.status(404).json({msg: "Prova não encontrada!"});
		}

		if(exam.post.authorId !== author.id) {
			return res.status(403).json({msg: "Apenas o criador da prova pode alterá-la."});
		}	
		
		const newPost = await db.post.update({
			where: { id: exam.postId },
			data: {
				content
			},
		});

		return res.status(200).json({ newPost });
	}

	// Funcional. Precisa terminar de configurar o "onDelete: Cascade" do prisma.
	async deleteExam(req: IRequestWithToken, res: Response) {
		if(!req.token) {
			return res.status(403).json({msg: "Token de autorização inválido."});
		}

		const author_id = req.token.user.id;

		const author = await db.user.findFirst({
			where: {
				id: author_id
			}
		});

		if(!author) {
			return res.status(404).json({msg: "Usuário não encontrado!"});
		}

		const exam_id = req.params.id;

		if(!exam_id) {
			return res.status(404).json({msg: "Prova não encontrada!"});
		}

		const exam = await db.exam.findFirst({
			where: { id : exam_id },
			include: {
				post: true
			}
		});

		if(!exam) {
			return res.status(404).json({msg: "Prova não encontrada!"});
		}

		if(exam.post.authorId !== author.id) {
			return res.status(403).json({msg: "Apenas o criador da prova pode deletá-la."});
		}
		
		const deletedExam = await db.exam.delete({
			where: {
				id: exam_id,
			},
			include: {
				questions: true
			}
		});

		return res.status(200).json({deletedExam});
	}
}
