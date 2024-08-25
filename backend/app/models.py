from pydantic import BaseModel

class Message(BaseModel):
    query: str

