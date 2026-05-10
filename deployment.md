# Deployment Guide

This guide covers deploying the Next.js frontend to Vercel and the FastAPI backend to Render.

## 1. Backend Deployment (Render)

1. Create a new Web Service on [Render](https://render.com/).
2. Connect your GitHub repository.
3. Configure the service:
   - **Root Directory**: `backend`
   - **Environment**: Python
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port 10000`
4. Add the following Environment Variables in the Render dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string.
   - `GEMINI_API_KEY`: Your Gemini API key.
5. Deploy the service. Once live, note the URL (e.g., `https://aura-backend.onrender.com`).

## 2. Frontend Deployment (Vercel)

1. First, update `frontend/src/app/page.tsx` to point to your new Render backend URL instead of `http://localhost:8000`. You can do this by using an environment variable, e.g., `process.env.NEXT_PUBLIC_API_URL`.
2. Create a new Project on [Vercel](https://vercel.com/).
3. Connect your GitHub repository.
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
5. Add Environment Variables in the Vercel dashboard:
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL (e.g., `https://aura-backend.onrender.com`).
6. Click **Deploy**. Vercel will automatically build and deploy your frontend.
