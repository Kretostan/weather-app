import cors from "cors";
import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import "dotenv/config";
import weatherRoutes from "./routes/weather";

const app = express();

const whitelist = [
	process.env.APP_URL,
	"http://localhost:8080",
	"http://localhost:5173",
];
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || !whitelist.includes(origin)) {
				callback(null, false);
			} else {
				callback(null, true);
			}
		},
	}),
);
app.use(express.json());

app.use("/weather", weatherRoutes);

app.get("/health", (_req, res) => res.status(200).json({ status: "OK" }));

// if (process.env.NODE_ENV !== "production") {
const port = 3000;
app.listen(port, "0.0.0.0", () => {
	console.log(`Listening on port: ${port}`);
});
// }

// export const api = onRequest({ region: "europe-central2" }, app);
