import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import prismaDB from "../database/prisma";
import { ForbiddenError } from "../helpers/errors/ApiErrors";
import { IJwtPayload } from "../token/IJwtPayload";
import { IRequestWithToken } from "../token/IRequestWithToken";

export const tokenValidation = async (req: IRequestWithToken, res: Response, next: NextFunction) => {
	const BearerToken = req.headers.authorization;
	const token = BearerToken && BearerToken.split(" ")[1];

	const invalidToken = await prismaDB.blackListToken.findFirst({
		where: {token: token}
	});

	if(invalidToken) {
		throw new ForbiddenError("Token inválido!");
	}

	if(!token) {
		throw new ForbiddenError("Ação proibida. Token inválido!");
	}

	req.token = (jwt.verify(token, process.env.SECRET as string) as IJwtPayload); // Não consegui fazer de outra forma sem ser usando cast em tudo.

	next();
};