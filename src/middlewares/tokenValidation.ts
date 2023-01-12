import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { ForbiddenError } from "../helpers/errors/ApiErrors";
import { IJwtPayload } from "../token/IJwtPayload";
import { IRequestWithToken } from "../token/IRequestWithToken";

export const tokenValidation = async (req: IRequestWithToken, res: Response, next: NextFunction) => {
	const BearerToken = req.headers.authorization;
	const token = BearerToken && BearerToken.split(" ")[1];

	if(!token) {
		return res.status(403).json({ error: "Token inválido! "});
	}

	req.token = (jwt.verify(token, process.env.SECRET as string) as IJwtPayload);

	next();
};