import { Response } from "express";
import { IRequestWithToken } from "../token/IRequestWithToken";

class AuthUserService {

<<<<<<< Updated upstream
	
	
}

export default AuthUserService;
=======
	// método apenas para testar se a autenticação está funcionando.
	static dashboard = async (req: IRequestWithToken, res: Response) => {
		return res.status(200).json({msg: "Bem vindo ao dashboard", token: req.token});
	};

	


}
>>>>>>> Stashed changes
