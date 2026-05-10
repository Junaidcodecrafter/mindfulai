from database import sessions_collection
from ml.sentiment import analyze_sentiment
from services.gemini_service import generate_response
from models.schemas import ChatResponse

CRISIS_KEYWORDS = [
    "suicide", "kill myself", "want to die", "end my life", 
    "self harm", "hurt myself", "cut myself"
]

async def process_chat(session_id: str, message: str) -> ChatResponse:
    # 1. Safety Intercept
    message_lower = message.lower()
    is_crisis = any(keyword in message_lower for keyword in CRISIS_KEYWORDS)
    
    if is_crisis:
        crisis_message = (
            "I'm so sorry you're feeling this way, but please know you are not alone. "
            "I'm an AI and cannot provide the help you need, but there are people who care and want to support you right now. "
            "Please reach out to a crisis hotline: In the US, call or text 988. "
            "In the UK, call 111. Please talk to someone who can help."
        )
        await _save_message(session_id, "user", message)
        await _save_message(session_id, "ai", crisis_message)
        return ChatResponse(response=crisis_message, sentiment="NEGATIVE", is_crisis=True)
    
    # 2. Sentiment Analysis
    sentiment = analyze_sentiment(message)
    
    # 3. Retrieve History
    session = await sessions_collection.find_one({"session_id": session_id})
    history = session.get("messages", []) if session else []
    
    # 4. Generate AI Response
    ai_response_text = generate_response(history, message, sentiment)
    
    # 5. Save to MongoDB
    await _save_message(session_id, "user", message)
    await _save_message(session_id, "ai", ai_response_text)
    
    return ChatResponse(response=ai_response_text, sentiment=sentiment, is_crisis=False)

async def _save_message(session_id: str, role: str, content: str):
    message_data = {"role": role, "content": content}
    await sessions_collection.update_one(
        {"session_id": session_id},
        {"$push": {"messages": message_data}},
        upsert=True
    )
