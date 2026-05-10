from transformers import pipeline

try:
    sentiment_pipeline = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
except Exception as e:
    print(f"Failed to load sentiment model: {e}")
    sentiment_pipeline = None

def analyze_sentiment(text: str) -> str:
    if not sentiment_pipeline:
        return "NEUTRAL"
    try:
        result = sentiment_pipeline(text)[0]
        return result['label']
    except Exception:
        return "NEUTRAL"
