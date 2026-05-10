from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

# Initialize Motor client
client = AsyncIOMotorClient(settings.mongodb_uri)
db = client.mental_health_companion

# Collections
sessions_collection = db.sessions
