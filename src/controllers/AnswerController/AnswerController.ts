import { Response } from "express";
import db from "../database/prisma";
import { IRequestWithToken } from "../token/IRequestWithToken";

class AnswersController {
	async retrieveAnswer (req: IRequestWithToken, res: Response) {
		const {id} = req.params;
		const answer = await db.answer.findFirst({
			where: {id},
			include: {
				post: true
			}
		});
		if (!answer) {
			return res.status(404).json({
				error: "questão não encontrada"
			});
		}
		return res.status(200).json({
			answer
		});
	}

	async listAnswers (req: IRequestWithToken, res: Response) {
		const answers = await db.answer.findMany({
			include: {
				post: true
			}
		});
		return res.status(200).json({
			answers
		});
	}
		
}


export default AnswersController;
