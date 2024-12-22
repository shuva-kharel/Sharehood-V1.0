# Setup Guide

## 1. Install Node Modules
Navigate to the `Sharehood-V1.0`
```bash
npm install
```
Then
Navigate to the `frontend` directory and install the dependencies:
```bash
cd frontend
npm install
```

## 2. Add .env File
```env
MONGO_URI=<MONGO_URI>
PORT=5000
JWT_SECRET=mysecretkey
NODE_ENV=development

EMAIL_USER=<email>
EMAIL_PASS=<pass>


CLIENT_URL= http://localhost:5173
```
Replace <MONGO_API> with your actual API keys.

## 3. Run Frontend
```bash
cd frontend
npm run dev
```


## 4. Run Backend
(open another termainal on `Sharehood-V1.0`)
```bash
npm run dev
```
