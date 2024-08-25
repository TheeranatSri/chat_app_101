from fastapi import APIRouter, Request
from backend.app.models import Message
from backend.app.services.chat_service import create_message

router = APIRouter()


@router.get("/")
async def root():
    return {"message": "Hello World"}


@router.post("/chat")
async def chat(message: Message):
    response = create_message( query=message.query)
    return {"user": message.query, "bot": response}
