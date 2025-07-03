.PHONY: dev-rebuild dev-up dev-down dev-restart dev-logs clean

# Docker Compose file for development
COMPOSE_FILE = docker-compose.development.yml

# Rebuild and restart development environment (the three commands you run frequently)
dev-rebuild:
	docker compose -f $(COMPOSE_FILE) down
	docker compose -f $(COMPOSE_FILE) build --no-cache
	docker compose -f $(COMPOSE_FILE) up

# Start development environment
dev-up:
	docker compose -f $(COMPOSE_FILE) up

# Start development environment in detached mode
dev-up-d:
	docker compose -f $(COMPOSE_FILE) up -d

# Stop development environment
dev-down:
	docker compose -f $(COMPOSE_FILE) down

# Restart development environment (without rebuild)
dev-restart:
	docker compose -f $(COMPOSE_FILE) restart

# View logs
dev-logs:
	docker compose -f $(COMPOSE_FILE) logs -f

# View logs for specific service (usage: make dev-logs-service SERVICE=api)
dev-logs-service:
	docker compose -f $(COMPOSE_FILE) logs -f $(SERVICE)

# Clean up (remove containers, networks, and volumes)
clean:
	docker compose -f $(COMPOSE_FILE) down -v --remove-orphans
	docker system prune -f 