import "express-async-errors";
import cors from "cors";
import express from "express";
import { config } from "dotenv";
import publicRouters from "./routes/publicRoutes";
import privateRouters from "./routes/privateRoutes";
import { middlewareError } from "./middlewares/error/middlewareError";

const app = express();
app.use(cors());
app.use(express.json());
// rotas
app.use(publicRouters);
app.use(privateRouters);
// error middleware
app.use(middlewareError);
// dotenv
config();

app.listen(4000, () => {
	console.log("Servidor rodando em http://localhost:4000");
});