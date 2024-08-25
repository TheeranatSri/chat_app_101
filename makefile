# Makefile for chat_app
# Variables
CONDA_ENV = chat_app
BACKEND_DIR = backend
FRONTEND_DIR = frontend

# Default target
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  make setup-backend    - Set up the backend environment and install dependencies"
	@echo "  make run-backend      - Run the FastAPI backend server"
	@echo "  make setup-frontend   - Install frontend dependencies"
	@echo "  make run-frontend     - Run the Vite development server"
	@echo "  make build-frontend   - Build the frontend for production"

# Backend
.PHONY: setup-backend
setup-backend:
	@echo "Setting up the backend environment with Conda and Poetry..."
	conda env create -f $(BACKEND_DIR)/environment.yml
	@echo "Activating Conda environment and installing dependencies with Poetry..."
	conda activate $(CONDA_ENV) && cd $(BACKEND_DIR)

.PHONY: run-backend
run-backend:
	@echo "Running the backend server with Poetry..."
	conda activate $(CONDA_ENV) && cd $(BACKEND_DIR) && uvicorn main:app --host 0.0.0.0 --port 8000 --reload

# Frontend
.PHONY: setup-frontend
setup-frontend:
	@echo "Setting up the frontend environment..."
	cd $(FRONTEND_DIR) && npm install

.PHONY: run-frontend
run-frontend:
	@echo "Running the frontend server..."
	cd $(FRONTEND_DIR) && npm run dev

#.PHONY: build-frontend
#build-frontend:
#	@echo "Building the frontend for production..."
#	cd $(FRONTEND_DIR) && npm run build
