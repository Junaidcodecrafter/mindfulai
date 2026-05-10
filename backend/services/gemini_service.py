import google.generativeai as genai
from config import settings

# Initialize Gemini
genai.configure(api_key=settings.gemini_api_key)

model = genai.GenerativeModel('gemini-1.5-flash')

SYSTEM_PROMPT = """
You are a highly empathetic, calming, and warm AI Mental Health Companion. 
Your goal is to provide a safe space for the user to express their feelings. 
You must practice active listening, validate their emotions, and respond with warmth.

STRICT ETHICAL GUARDRAILS:
1. You are a companion, NOT a licensed therapist or medical professional.
2. You CANNOT and MUST NOT provide medical advice, diagnose conditions, prescribe medication, or claim to cure trauma or depression.
3. If the user asks for medical advice, gently remind them of your limitations and encourage them to seek professional help.
4. Keep your responses relatively concise to encourage a back-and-forth conversation, avoiding overly long paragraphs.

Tone: Soft, soothing, non-judgmental, and deeply empathetic.
"""

def generate_response(history: list, current_message: str, user_sentiment: str) -> str:
    prompt = f"{SYSTEM_PROMPT}\n\n"
    prompt += f"Note to AI: The user's current emotional sentiment is detected as: {user_sentiment}.\n"
    prompt += "Please adjust your tone accordingly.\n\n"
    
    prompt += "Conversation History:\n"
    for msg in history[-10:]: # Keep context window manageable
        role = "User" if msg['role'] == "user" else "You"
        prompt += f"{role}: {msg['content']}\n"
    
    prompt += f"\nUser: {current_message}\nYou:"
    
    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return "I'm having a little trouble connecting right now, but I'm here for you. Could you try saying that again?"
