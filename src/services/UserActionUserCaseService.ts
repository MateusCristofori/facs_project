import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UserLoginDTO } from "../dtos/UserLoginDTO";
import bcrypt from "bcrypt";
import prisma from "../database/prisma";

export class UserActionsUseCaseService {
	static userLogin = async (req: Request, res: Response) => {
		const { email, password }: UserLoginDTO = req.body;



	};

	static registerNewUser = async (req: Request, res: Response) => {
		const { name, email, password }: CreateUserDTO = req.body;

		if(!name || !email || !password) {
			res.status(400).json({msg: "Todas as informações precisam ser preenchidas!"});
		}
		

		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				password
			}
		});
		return res.status(201).json(newUser);
	};
}