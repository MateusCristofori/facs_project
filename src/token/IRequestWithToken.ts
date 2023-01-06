import { Request } from "express";
import { IJwtPayload } from "./IJwtPayload";

export interface IRequestWithToken extends Request {
	token?: IJwtPayload;
}