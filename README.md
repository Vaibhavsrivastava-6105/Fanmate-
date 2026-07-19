# FAN MATE AI — FIFA World Cup 2026 Smart Stadium Companion

**Live Production Demo:** [https://fanmate-ai.vercel.app](https://fanmate-ai.vercel.app)

FAN MATE AI is a premium, AI-powered web application designed to enhance the experience of football fans attending FIFA World Cup 2026 matches. It serves as a smart stadium companion, guiding users from the moment they enter the gates until they leave.

## 1. Chosen Vertical
**Sports & Entertainment (Fan Experience)**
This project focuses on the *Football Fan Persona*, aiming to solve real-world stadium pain points: navigating massive crowds, avoiding long food queues, and finding the best transport options after a match.

## 2. Approach and Logic
The application is built with a highly decoupled, modern architecture:
- **Frontend (Next.js & Tailwind CSS)**: Engineered for premium, cinematic UI/UX. The landing page features a buttery-smooth **60FPS GSAP ScrollTrigger** engine that scales a photorealistic HDR background image based on user scroll position.
- **Backend (FastAPI & Python)**: A lightweight, asynchronous backend designed to handle AI requests and serve live stadium data.

## 3. How the Solution Works
- **Landing Page (GSAP Engine)**: Engages users immediately with a full-screen scroll-driven cinematic animation, infinite scrolling live ticker, and feature cards.
- **AI Assistant**: A contextual chat interface where users can ask questions (e.g., "Where is the nearest food court?").
- **Live Dashboard**: Displays animated cards showing real-time metrics for weather, crowd congestion, food queues, and transport status.
- **Stadium Map**: An interactive mapping component showing points of interest and live crowd density.

## 4. Assumptions Made
- The backend currently uses mocked JSON data to simulate live APIs that a real stadium would provide (e.g., ticket scanners, CCTV crowd estimates).
- The AI API calls are simulated locally via the backend to ensure immediate testability without requiring the judges to input their own API keys.
- The interactive map uses generic coordinates but is architected to seamlessly accept custom stadium blueprints.

---

## Evaluation Focus Areas Checklist

### 🌟 Code Quality (High Impact)
- **Component-Based Architecture**: Separation of concerns using React components.
- **Maintainability**: Clean, modular Next.js `app/` directory structure. 
- **State Management**: React Hooks (`useState`, `useRef`, `useCallback`) used efficiently to prevent unnecessary re-renders.

### 🔒 Security
- Safe handling of environment variables (configured via `.gitignore` to prevent secret leakage).
- React Server Components utilized to keep sensitive execution off the client.

### ⚡ Efficiency
- **Asset Optimization**: The 100vh GSAP scroll animation uses GPU-accelerated CSS transforms (`transform-origin`, `scale`) on a static image instead of loading hundreds of heavy video frames, ensuring instantaneous load times.
- **Repository Size**: Strictly under 10MB as per challenge rules. 

### 🧪 Testing
- **Validation**: Core flows (routing between Home, Dashboard, AI Assistant) have been manually validated across Desktop, Tablet, and Mobile viewports.
- **Error Handling**: Graceful fallbacks implemented for missing data or failed image loads.

### ♿ Accessibility
- **Semantic HTML**: Proper use of `<section>`, `<nav>`, `<main>`, and `<h1>` to `<h4>` tags for screen readers.
- **Color Contrast**: Deep `#0A0F24` background with bright white text ensuring compliance with WCAG contrast standards.

---

## Installation & Running Locally

### Prerequisites
- Node.js (v18+)
- Python 3.9+
- Git

### Quick Start

1. **Clone the repo**
   ```bash
   git clone https://github.com/Vaibhavsrivastava-6105/Fanmate-.git
   cd Fanmate-
   ```

2. **Run the Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The app will be available at http://localhost:3000*

3. **Run the Backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   python -m uvicorn main:app --reload
   ```
