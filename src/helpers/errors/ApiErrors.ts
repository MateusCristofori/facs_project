// classes que representam erros
export class ApiErrors extends Error {
	constructor(msg: string, public readonly statusCode?: number) {
		super(msg);
		this.statusCode = statusCode;
	}
}

export class NotFoundError extends ApiErrors {
	constructor(msg: string){
		super(msg, 404);
	}
}

export class BadRequestError extends ApiErrors {
	constructor(msg: string) {
		super(msg, 400);
	}
}

export class ForbiddenError extends ApiErrors {
	constructor(msg: string) {
		super(msg, 403);
	}
}

export class Unauthorized extends ApiErrors {
	constructor(msg: string) {
		super(msg, 401);
	}
}