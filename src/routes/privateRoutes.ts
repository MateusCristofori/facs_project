import { Router } from "express";
import { AuthUserController } from "../controllers/AuthUserController";
import { tokenValidation } from "../middlewares/tokenValidation";


const privateRouters = Router();

// Rota para testar, inicialmente, a autenticação de usuário.
privateRouters.route("/users/dashboard")
	.get(tokenValidation, AuthUserController.dashboardHandler);

privateRouters.route("/users/logout")
	.post(AuthUserController.userLogoutHandler);

export default privateRouters;