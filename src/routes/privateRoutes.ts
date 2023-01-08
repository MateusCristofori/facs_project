import { Router } from "express";
import AuthUserController from "../controllers/AuthUserController/AuthUserController";
import { tokenValidation } from "../middlewares/tokenValidation";


const privateRouters = Router();

// Rota para testar, inicialmente, a autenticação de usuário.
privateRouters.route("/dashboard")
	.get(tokenValidation, AuthUserController.dashboardHandler);



export default privateRouters;