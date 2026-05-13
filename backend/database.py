from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

# Initialize Motor client with a short timeout
client = AsyncIOMotorClient(settings.mongodb_uri, serverSelectionTimeoutMS=2000)
db = client.mental_health_companion

# Collections
sessions_collection = db.sessions
