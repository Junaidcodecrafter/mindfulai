FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Set up a cache directory for Hugging Face models so it doesn't crash on read-only systems
ENV TRANSFORMERS_CACHE=/tmp/huggingface
RUN mkdir -p /tmp/huggingface && chmod 777 /tmp/huggingface

# Copy the backend code
COPY . .

# Expose port 7860 (Hugging Face Spaces default port)
EXPOSE 7860

# Start the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
