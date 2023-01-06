import { Request, Response } from "express";
import { UserPublicService } from "../services/UserPublicService";


export class UserPublicController {

	static getAllUsersHandler = async (req: Request, res: Response) => {
		UserPublicService.getAllUsers(req, res);
	};
	
	static userLoginHandler = async (req: Request, res: Response) => {
		UserPublicService.userLogin(req, res);
	};

	static registerNewUserHandler = async (req: Request, res: Response) => {
		UserPublicService.registerNewUser(req, res);
	};
}