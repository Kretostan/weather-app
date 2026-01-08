import cors from "cors";
import express from "express";
import "dotenv/config";
import weatherRoutes from "./routes/weather";

const PORT = Number(process.env.PORT);

const app = express();

const whitelist = [
	String(process.env.APP_URL),
	"http://localhost:80",
	"http://localhost:5173",
];
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin) return callback(null, true);
			return callback(null, whitelist.includes(origin));
		},
		credentials: true,
	}),
);
app.use(express.json());

app.use(weatherRoutes);

app.get("/health", (_req, res) => res.status(200).json({ status: "OK" }));

app.listen(PORT, "0.0.0.0", () => {
	console.log(`Listening on port: ${PORT}`);
});
