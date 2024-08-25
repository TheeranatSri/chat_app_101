import google.generativeai as genai
from google.generativeai.types.content_types import ContentDict
from backend.app.config import Config

genai.configure(api_key=Config.GOOGLE_API_KEY)

model = genai.GenerativeModel(model_name="gemini-1.5-flash",
                              system_instruction="You are assistance for answering questions from users. "
                                                 "Every answer following 'neow'",
                              generation_config=genai.GenerationConfig(
                                  max_output_tokens=1024,
                                  top_k=40,
                                  top_p=0.95,
                                  temperature=0.4
                              ))

chat_model = model.start_chat()
his = []


def create_message(query: str):
    response = chat_model.send_message(ContentDict(role="user", parts=[query]))
    his.append(response)
    return response.text
