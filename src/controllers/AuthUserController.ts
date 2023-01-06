import { Response } from "express";
import { AuthUserService } from "../services/AuthUserService";
import { IRequestWithToken } from "../token/IRequestWithToken";


export class AuthUserController {
	static dashboardHandler = async (req: IRequestWithToken, res: Response) => {
		AuthUserService.dashboard(req, res);
	};
}
