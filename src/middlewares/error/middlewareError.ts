import { NextFunction, Request, Response } from "express";
import { ApiErrors } from "../../helpers/errors/ApiErrors";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const middlewareError = async (error: Error & Partial<ApiErrors>, req: Request, res: Response, next: NextFunction) => {

	const statusCode = error.statusCode ?? 500; // Caso o "error.statusCode" não tenha nenhum valor, será atribuído a ele o status code "500".

	const errorMessage = statusCode ? error.message : "Internal server error"; // Caso o status code seja true, se tiver valor, vamos entender que é um erro "customizado" e vamos pegar a mensagem desse erro. Caso não tenha, será simplesmente um internal server erro com status code 500.

	res.status(statusCode).json({errorMessage});
};