import type { Request, Response } from "express";
import { Router } from "express";

import { fetchWeather } from "../controllers/weather";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
	return res.send("Backend is running!");
});

router.post("/weather", fetchWeather);

export default router;
