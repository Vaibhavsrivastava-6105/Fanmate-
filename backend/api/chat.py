from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
import os

router = APIRouter()

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

@router.post("/")
async def chat_endpoint(request: ChatRequest):
    # Mocking AI response for now, as no API key was provided
    last_message = request.messages[-1].content.lower()
    
    mock_reply = "I'm FanMate AI. How can I assist you with your stadium experience today?"
    
    if "food" in last_message or "eat" in last_message:
        mock_reply = "The nearest option is Food Court C. It serves vegetarian and halal meals. Current queue is approximately 5 minutes."
    elif "leave" in last_message or "exit" in last_message:
        mock_reply = "The fastest exit from your section is Gate B. It is less crowded right now and a 3-minute walk. The Metro is running normally outside."
    elif "seat" in last_message:
        mock_reply = "Please check the Stadium Map to find the fastest route to your seat. The aisles are currently clear."
    
    return {"reply": mock_reply}
