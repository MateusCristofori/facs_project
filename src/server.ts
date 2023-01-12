import cors from "cors";
import { config } from "dotenv";
import express from "express";
import "express-async-errors";
import privateRouters from "./routes/privateRoutes";
import publicRouters from "./routes/publicRoutes";

const app = express();
app.use(cors());
app.use(express.json());
// rotas
app.use(publicRouters);
app.use(privateRouters);
// error middleware
// dotenv
config();

app.listen(4000, () => {
	console.log("Servidor rodando em http://localhost:4000");
});