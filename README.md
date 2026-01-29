# KazInvest Engineering Assistant

AI-powered chat assistant built with React and NestJS.

## 🔗 Live Demo

**Frontend:** https://kaz-invest-engineering-assistant-ei.vercel.app  
**Backend:** https://kaz-invest-engineering-assistant.vercel.app

## Features

- ChatGPT integration (GPT-4o-mini)
- Voice input (Web Speech API)
- Chat history with context
- Common prompts for quick start
- CORS protection & input validation
- Loading indicators & error handling

## 🛠 Tech Stack

| Frontend | Backend |
|----------|---------|
| React 19 | NestJS 11 |
| Vite | OpenAI SDK |
| TypeScript | TypeScript |

## Local Development

```bash
# Backend
cd backend
npm install
cp .env.example .env  # Add your OPENAI_API_KEY
npm run start:dev

# Frontend
cd frontend
npm install
npm run dev
```

## 📁 Project Structure

```
├── backend/          # NestJS API server
│   └── src/
│       ├── chat.controller.ts
│       ├── chat.service.ts
│       └── main.ts
├── frontend/         # React application
│   └── src/
│       ├── components/
│       ├── api/
│       └── App.tsx
```
