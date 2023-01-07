import { Request, Response } from "express";
import { UserPublicService } from "../services/UserPublicService";

class UserPublicController {
	static userLoginHandler = async (req: Request, res: Response) => {
		UserPublicService.userLogin(req, res);
	};

	static registerNewUserHandler = async (req: Request, res: Response) => {
		UserPublicService.registerNewUser(req, res);
	};
}

export default UserPublicController;
