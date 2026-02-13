from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

import certifi

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DATABASE_NAME = "titantechparts"

client = AsyncIOMotorClient(MONGO_URL, tlsCAFile=certifi.where())
db = client[DATABASE_NAME]

async def get_database():
    return db
