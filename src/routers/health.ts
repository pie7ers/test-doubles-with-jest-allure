import { Router } from "express";
import health from "../controllers/health";

const healthRouter = Router();

healthRouter.get('/health', health);

export default healthRouter;