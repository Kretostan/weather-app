import type { Request, Response } from "express";
import { Router } from "express";

import { getWeather } from "../controllers/weather";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
	return res.send("Backend is running!");
});

router.post("/weather", getWeather);

export default router;
