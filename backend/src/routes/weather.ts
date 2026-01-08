import { Router } from "express";

import { fetchWeather } from "../controllers/weather";

const router = Router();

router.post("/current", fetchWeather);

export default router;
