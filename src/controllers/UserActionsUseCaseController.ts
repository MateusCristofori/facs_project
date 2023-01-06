import { Request, Response } from "express";
import { UserActionsUseCaseService } from "../services/UserActionUserCaseService";

export class UserActionsUseCaseController {
	static userLoginHandler = async (req: Request, res: Response) => {
		UserActionsUseCaseService.userLogin(req, res);
	};

	static registerNewUserHandler = async (req: Request, res: Response) => {
		UserActionsUseCaseService.registerNewUser(req, res);
	};
}