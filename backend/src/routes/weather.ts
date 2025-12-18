import type { Request, Response } from "express";
import { Router } from "express";

import {
	fetchCurrentWeather,
	fetchThreeDaysForecast,
} from "../controllers/weather";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
	return res.send("Backend is running!");
});

router.post("/current", fetchCurrentWeather);

router.post("/threeDays", fetchThreeDaysForecast);

export default router;
