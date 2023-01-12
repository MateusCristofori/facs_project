import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import db from "../database/prisma";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserLoginDTO } from "../dtos/UserLoginDTO";
import { generatedPasswordHash } from "../helpers/generatedPasswordHash";

export default class UserPublicController {

	async registerNewUserHandler(req: Request, res: Response)  {
		
		const { name, email, password }: CreateUserDTO = req.body;

		if(!name || !email || !password) {
			return res.status(400).json({msg: "Os campos de 'nome', 'email' e 'senha' precisam ser preenchidos."});
		}

		const passwordHash = await generatedPasswordHash(password);

		const newUser = await db.user.create({
			data: {
				username: name,
				email,
				password: passwordHash,
			},
			select: {
				password: false
			}
		});

		return res.status(201).json(newUser);
	}

	async userLoginHandler(req: Request, res: Response) {
		const { email, password }: UserLoginDTO = req.body;

		if(!email || !password) {
			return res.status(400).json({msg: "Os campos de 'email' e 'senha' precisam ser preenchidos para o processo de login."});
		}
		
		const user = await db.user.findFirst({
			where: { email: email }
		});

		if(!user) {
			return res.status(404).json({msg: "Usuário não encontrado!"});
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if(!passwordMatch) {
			return res.status(400).json({msg: "Senha incorreta!"});
		}

		const token = jwt.sign({
			user: {
				id: user.id,
				name: user.username,
				email: user.email
			}
		}, process.env.SECRET as string, {
			expiresIn: "1d"
		});

		res.status(200).json({
			auth: true, 
			user: { 
				id: user.id, 
				name: user.username, 
				email: user.email
			}, 
			token
		});
	}
}