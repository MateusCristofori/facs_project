import { Response } from "express";
import prisma from "../database/prisma";
import { IRequestWithToken } from "../token/IRequestWithToken";

export class AuthUserService {

	// método apenas para testar se a autenticação está funcionando.
	static dashboard = async (req: IRequestWithToken, res: Response) => {
		return res.status(200).json({msg: "Bem vindo ao dashboard", token: req.token});
	};

	static userLogout = async (req: IRequestWithToken, res: Response) => {
		const bearerToken = req.headers.authorization as string;
		const token = bearerToken && bearerToken.split(" ")[1];

		const invalidToken = await prisma.blackListToken.create({
			data: {
				token,
			}
		});

		res.status(200).json({msg: "Deslogado. Faça o login novamente!"});
	};

}