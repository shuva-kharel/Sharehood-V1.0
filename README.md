# Setup Guide

## 1. Install Node Modules
Navigate to the `frontend` directory and install the dependencies:
```bash
cd frontend
npm install
```

## 2. Run Frontend
```bash
npm run dev
```

## 3. Add .env File
```env
MONGO_URI=<MONGO_API>
PORT=5000
JWT_SECRET=mysecretkey
NODE_ENV=development

MAILTRAP_TOKEN=<MAILTRAP_API>

CLIENT_URL=http://localhost:5173
```
Replace <MONGO_API> and <MAILTRAP_API> with your actual API keys.

## 4. Run Backend
```bash
cd ..
npm run dev
```
