from google import genai
from config import settings

# Initialize Gemini client
client = genai.Client(api_key=settings.gemini_api_key)

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
    # Build conversation history in the new format
    contents = []
    
    for msg in history[-10:]:  # Keep context window manageable
        role = "user" if msg['role'] == "user" else "model"
        contents.append(
            genai.types.Content(
                role=role,
                parts=[genai.types.Part(text=msg['content'])]
            )
        )
    
    # Add current message with sentiment note
    current_with_sentiment = (
        f"{current_message}\n\n"
        f"[Detected emotional sentiment: {user_sentiment}. Adjust tone accordingly.]"
    )
    contents.append(
        genai.types.Content(
            role="user",
            parts=[genai.types.Part(text=current_with_sentiment)]
        )
    )

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=contents,
            config=genai.types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT,
                temperature=0.7,
            )
        )
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return "I'm having a little trouble connecting right now, but I'm here for you. Could you try saying that again?"