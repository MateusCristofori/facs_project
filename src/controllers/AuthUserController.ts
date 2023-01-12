import { Response } from "express";
import db from "../database/prisma";
import { IRequestWithToken } from "../token/IRequestWithToken";

export default class AuthUserController {
	async userLogout(req: IRequestWithToken, res: Response) {
		if(!req.token) {
			return res.status(403).json({msg: "Token de autorização inválido!"});
		}

		const bearerToken = req.headers.authorization;
		const token = bearerToken && bearerToken.split(" ")[1];
    
		if(!token) {
			return res.status(403).json({msg: "Token inválido!"});
		}

		const user_id = req.token?.user.id;

		const invalidToken = await db.blackListToken.create({
			data: {
				token,
				userId: user_id
			}
		});

		return res.status(200).json({msg: "Deslogado! É necessário logar novamente"});
	}
}
