import express from "express";
import cors from "cors";
import { routes } from "./routes";
import { authRouter } from "./routes/auth.routes";



const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use("/auth", authRouter);


export { app };
