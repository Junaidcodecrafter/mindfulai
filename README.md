# Aura - AI Mental Health Companion

Aura is a compassionate, AI-driven mental health companion built as a semester project for "Machine Learning Fundamentals". It is designed to provide a calming presence and empathetic emotional support through both text and voice interactions.

> **Disclaimer**: Aura is an AI companion, not a licensed therapist or medical professional. It cannot diagnose conditions, prescribe medication, or provide professional medical advice. If you are experiencing a crisis, please seek immediate help from a crisis hotline.

## 🌟 Key Features

- **Empathetic AI Core**: Powered by Google's Gemini API, strictly instructed to practice active listening and provide a warm, non-judgmental safe space.
- **Sentiment Analysis**: Integrates a Hugging Face Machine Learning pipeline (`distilbert-base-uncased-finetuned-sst-2-english`) to analyze the user's emotional state in real-time, allowing the AI to adjust its tone dynamically.
- **Voice Capabilities**: Native integration with the browser's Web Speech API for seamless Voice-to-Text and Text-to-Voice interactions, making the experience feel organic and conversational.
- **Calming UI/UX**: A distraction-free, visually soothing interface built with Next.js, Tailwind CSS, and Framer Motion. Features a dynamic, "breathing" visualizer that reacts to the AI's state (listening vs. thinking).
- **Strict Ethical Guardrails**: Hardcoded safety intercepts that immediately detect crisis keywords and provide international hotline numbers (e.g., 988 in the US, 111 in the UK) without relying on the LLM's response generation.
- **Memory & Context**: Uses MongoDB to store user interactions and session data, ensuring context is maintained throughout the conversation.

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **Tailwind CSS** (for styling)
- **Framer Motion** (for fluid animations)
- **Lucide React** (for minimalist icons)

### Backend
- **Python 3.10+**
- **FastAPI** (High-performance API framework)
- **Motor** (Asynchronous MongoDB client)
- **Google Generative AI** (Gemini 1.5 Flash)
- **Transformers / PyTorch** (Hugging Face ML Pipelines)

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.10+)
- A [MongoDB Atlas](https://www.mongodb.com/atlas/database) cluster (or local MongoDB instance)
- A [Google Gemini API Key](https://aistudio.google.com/)

### 1. Setup the Backend

```bash
cd backend
python -m venv venv

# Activate the virtual environment
# On Windows:
.\venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:
```env
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

Run the FastAPI server:
```bash
uvicorn main:app --reload --port 8000
```

### 2. Setup the Frontend

Open a new terminal window:
```bash
cd frontend

# Install Node dependencies
npm install
```

Run the Next.js development server:
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser to interact with Aura!

## 🌍 Deployment

Please refer to the [`deployment.md`](deployment.md) file in this repository for step-by-step instructions on deploying the frontend to Vercel and the backend to Render.
