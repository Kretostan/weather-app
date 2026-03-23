dev-up:
	docker compose -p weather-app-dev -f compose.dev.yml --env-file .env.development up --build -d

dev-start:
	docker compose -p weather-app-dev -f compose.dev.yml --env-file .env.development up --build -d

dev-stop:
	docker compose -p weather-app-dev stop

dev-down:
	docker compose -p weather-app-dev down

prod-up:
	docker compose -p weather-app-prod -f compose.prod.yml --env-file .env up --build -d

prod-start:
	docker compose -p weather-app-prod -f compose.prod.yml --env-file .env up --build -d

prod-stop:
	docker compose -p weather-app-prod stop

prod-down:
	docker compose -p weather-app-prod down
