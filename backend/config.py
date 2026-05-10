from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    mongodb_uri: str = "mongodb://localhost:27017"
    gemini_api_key: str = "" # Default to empty to avoid instant crash if not set in dev
    
    class Config:
        env_file = ".env"

settings = Settings()
