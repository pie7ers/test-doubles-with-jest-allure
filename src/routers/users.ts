import { Router } from "express";
import login from "../controllers/login";

const usersRouter = Router()

usersRouter.post('/login', login);


export default usersRouter