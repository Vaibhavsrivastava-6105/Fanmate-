from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.chat import router as chat_router
from api.stadium import router as stadium_router

app = FastAPI(title="FanMate AI Backend")

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api/chat", tags=["chat"])
app.include_router(stadium_router, prefix="/api/stadium", tags=["stadium"])

@app.get("/")
def read_root():
    return {"message": "FanMate AI API is running"}
