from transformers import pipeline

# Load sentiment analysis pipeline from Hugging Face Transformers
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

def analyze_sentiment(text):
    """
    Perform sentiment analysis using Hugging Face Transformers.
    Returns a dictionary with sentiment score and label.
    """
    try:
        analysis = sentiment_analyzer(text[:512])  # Limit input to 512 tokens
        result = analysis[0]
        sentiment_label = result['label']
        sentiment_score = result['score']
        return {"label": sentiment_label, "score": sentiment_score}
    except Exception as e:
        return {"label": "Neutral", "score": 0.0}