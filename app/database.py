from motor.motor_asyncio import AsyncIOMotorClient
import os

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DATABASE_NAME = "TitanTech"

client = AsyncIOMotorClient(MONGO_URL)
db = client[DATABASE_NAME]

async def get_database():
    return db
