import { JwtPayload } from "jsonwebtoken";

export interface IJwtPayload extends JwtPayload {
  user: {
    id: string,
    name: string,
    email: string
  }
}