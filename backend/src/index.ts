import express from "express";
import cors from "cors";
import "dotenv/config.js"

import {getCurrentWeather} from './utils/forecast.ts'

const app = express()

const PORT = process.env.PORT || 5001

app.use(cors());
app.use(express.json());

app.post(`/get-weather`, async (req, res ) => {
    try {
        const weather = await getCurrentWeather(req.body.location)
        res.json({ weather });
    } catch (error) {
        res.status(500).json({ error: "Failed to download weather data." });
    }
})


app.listen(PORT, () => console.log(`Listening on ${PORT}`))