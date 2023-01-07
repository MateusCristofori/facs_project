import { Response } from "express";
import db from "../../database/prisma";
import { CreateaAnswerDTO } from "../../dtos/CreateAnswerDTO";
import { NotFoundError } from "../../helpers/errors/ApiErrors";
import { IRequestWithToken } from "../../token/IRequestWithToken";

class AnswersService {
	async retriverAnswer(req: IRequestWithToken, res: Response) {
		const answer_id = req.params.id;
     
		const answer = await db.answer.findFirst({
			where: {id: answer_id}
		});

		if(!answer) {
			throw new NotFoundError("Resposta não encontrada!");
		}

		res.status(200).json(answer);
	}

	async listAnswers(req: IRequestWithToken, res: Response) {
		const answers = await db.answer.findMany({});

		if(answers.length == 0) {
			throw new NotFoundError("Não existem notícias cadastradas!");
		}

		res.status(200).json(answers);
	}

  
	// async createAnswer(req: IRequestWithToken, res: Response) {
	//   const {}: CreateaAnswerDTO = req.body;
	// }




}

export default new AnswersService();