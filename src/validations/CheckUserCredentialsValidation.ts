import { BadRequestError } from "../helpers/errors/ApiErrors";

export class CheckUserCredentialsValidation {
	static checkUserEmail = (email: string) => {
		if(!email) {
			throw new BadRequestError("O campo de e-mail precisa ser preenchido!");
		}

		if(!email.includes("@")) {
			throw new BadRequestError("O e-mail informado precisa ser válido!");
		}
	};

	static checkUserPassword = (password: string) => {
		if(!password) {
			throw new BadRequestError("A senha precisa ser válida!");
		}
	};

	static checkUserName = (name: string) => {
		if(!name) {
			throw new BadRequestError("O nome precisa ser válido!");
		}
	};
}