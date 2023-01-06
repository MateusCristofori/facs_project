/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../database/prisma";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserLoginDTO } from "../dtos/UserLoginDTO";
import { BadRequestError, NotFoundError } from "../helpers/errors/ApiErrors";
import { generatedPasswordHash } from "../helpers/generatedPasswordHash";


export class UserPublicService {

	// Funcional!
	static getAllUsers = async (req: Request, res: Response) => {
		const users = await prisma.user.findMany({select: {id: true, username: true, email: true }});

		res.status(200).json(users);
	};

	// Funcional!
	static userLogin = async (req: Request, res: Response) => {
		const { email, password }: UserLoginDTO = req.body;

		const user = await prisma.user.findFirst({
			where: { email: email }
		});

		if(!user) {
			throw new NotFoundError("Usuário não encontrado!");
		}

		const passwordMatch = await bcrypt.compare(password, user!.password);

		if(!passwordMatch) {
			throw new BadRequestError("Senha incorreta!");
		}

		const token = jwt.sign({
			user: {
				id: user?.id,
				name: user?.username,
				email: user?.email
			}
		}, process.env.SECRET as string, {
			expiresIn: "1d"
		});

		res.status(200).json({
			auth: true, 
			user: { 
				id: user?.id, 
				name: user?.username, 
				email: user?.email
			}, 
			token
		});
	};

	// Funcional!
	static registerNewUser = async (req: Request, res: Response) => {
		const { name, email, password }: CreateUserDTO = req.body;

		if(!name || !email || !password) {
			throw new BadRequestError("Todas as informações precisam ser preenchidas!");
		}
		
		const passwordHash = await generatedPasswordHash(password);

		const newUser = await prisma.user.create({
			data: {
				username: name,
				email,
				password: passwordHash,
			}
		});

		return res.status(201).json(newUser);
	};
}