.PHONY: help install dev build preview lint clean start

help:
	@echo "NutriGuard - Available Commands"
	@echo ""
	@echo "  make install      - Install dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make build        - Build for production"
	@echo "  make preview      - Preview production build"
	@echo "  make lint         - Run ESLint"
	@echo "  make clean        - Remove node_modules and lock files"
	@echo "  make start        - Install (if needed) and start dev server"
	@echo ""

install:
	@echo "Installing dependencies..."
	npm install --legacy-peer-deps

dev:
	@echo "Starting development server..."
	npm run dev

build:
	@echo "Building for production..."
	npm run build

preview:
	@echo "Previewing production build..."
	npm run preview

lint:
	@echo "Running ESLint..."
	npm run lint

clean:
	@echo "Cleaning up..."
	rm -rf node_modules package-lock.json
	@echo "Done! Run 'make install' to reinstall"

start: 
	@if [ ! -d "node_modules" ]; then \
		echo "Dependencies not found. Installing..."; \
		npm install --legacy-peer-deps; \
	fi
	@echo "Starting development server..."
	npm run dev
