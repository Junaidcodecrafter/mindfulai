from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

def analyze_sentiment(text: str) -> str:
    try:
        scores = analyzer.polarity_scores(text)
        compound = scores['compound']
        
        if compound >= 0.05:
            return "POSITIVE"
        elif compound <= -0.05:
            return "NEGATIVE"
        else:
            return "NEUTRAL"
    except Exception:
        return "NEUTRAL"
