import { Router } from "express";

import { fetchWeather } from "../controllers/weather";

const router = Router();

router.post("/weather", fetchWeather);

export default router;
