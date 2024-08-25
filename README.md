# Basic Chat

## Overview
This project is a basic chat application that includes both a backend built with FastAPI and a frontend built with React using Vite. The backend provides API endpoints to interact with a generative AI model, while the frontend serves as the user interface for interacting with the backend.

## Prerequisites
- [Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/install/index.html)
- [Node.js & npm](https://nodejs.org/en/download/)
- [GeminiApi](https://aistudio.google.com/app/apikey)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/my_project.git
```
### 2. Backend Setup
a. Create and Activate the Conda Environment
```bash
cd my_project
conda env create -f backend/environment.yml
conda activate chat_app 
```
b. Configure Environment Variables
Create a **.env** file in the **backend/** directory and add your environment variables, for example:<br>

GOOGLE_API_KEY=your-google-api-key

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Running the Application
a. Run the Backend Server
```bash
cd ../backend/app
fastapi run main.py
b. Run the Frontend Development Server
```bash
cd ../frontend
npm run dev
```
