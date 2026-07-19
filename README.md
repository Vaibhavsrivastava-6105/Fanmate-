# FanMate AI – FIFA World Cup 2026 Smart Stadium Companion

FanMate AI is a premium, AI-powered web application designed to enhance the experience of football fans attending FIFA World Cup 2026 matches. It serves as a smart stadium companion, guiding users from the moment they enter the gates until they leave.

## Chosen Vertical
**Sports & Entertainment (Fan Experience)**
This project focuses on the *Football Fan Persona*, aiming to solve pain points like navigating massive stadiums, avoiding long food queues, and finding the best transport options after a match.

## Approach and Logic
The application is built with a decoupled architecture:
1.  **Frontend (Next.js & Tailwind CSS)**: Focuses heavily on premium UI/UX, drawing inspiration from Apple and Vercel. It uses Framer Motion for cinematic page transitions and micro-interactions, ensuring the app feels alive and highly polished. Leaflet is used for interactive stadium mapping.
2.  **Backend (FastAPI & Python)**: A lightweight backend designed to handle AI requests and serve live stadium data. It currently uses a robust mock data architecture to simulate live crowd metrics, wait times, and weather, allowing the UI to react realistically.

## How the Solution Works
*   **Landing Page**: Engages users immediately with a full-screen cinematic hero, infinite scrolling live ticker, and animated feature cards.
*   **AI Assistant**: A chat interface where users can ask questions like "Where is the nearest food court?" The AI provides context-aware answers based on the stadium's real-time data.
*   **Live Dashboard**: Displays 6 highly animated cards showing real-time metrics for weather, crowd congestion, food queues, and transport status, plus an AI-generated recommendation.
*   **Stadium Map**: An interactive map built with Leaflet showing points of interest (Gates, Food, Seats) and their current crowd levels.

## Assumptions Made
*   The backend currently uses mocked JSON data to simulate the live APIs that a real stadium would provide (e.g., ticket scanners, CCTV crowd estimates, POS terminal queues).
*   AI API calls are simulated locally as the OpenAI key was not provided during this phase, but the architecture is ready to accept a live key.
*   The map uses generic coordinates but is architected to accept custom stadium blueprints.

## Tech Stack
*   **Frontend**: Next.js, React, Tailwind CSS v4, Framer Motion, Lucide Icons, Leaflet
*   **Backend**: Python, FastAPI, Uvicorn
*   **Deployment Ready**: Entire project is < 10MB as requested.

## Installation & Running Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
