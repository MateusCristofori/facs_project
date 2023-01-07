import { prisma } from "@prisma/client";
import { Response } from "express";
import { IRequestWithToken } from "../token/IRequestWithToken";
import db from "../database/prisma";
import { NotFoundError } from "../helpers/errors/ApiErrors";


export default class QuestionController {
	async retrieveQuestion (req: IRequestWithToken, res: Response) {
	}
      
	async listQuestions()  {
	}
    
	async createQuestion () {
	}
    
	async updateQuestion   () {
        
	}
    
	async deleteQuestion  () {
    
	}

}