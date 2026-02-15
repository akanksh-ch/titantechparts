from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

import certifi

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DATABASE_NAME = "titantechparts"

client = AsyncIOMotorClient(MONGO_URL, tlsCAFile=certifi.where()) if "localhost" not in MONGO_URL and "127.0.0.1" not in MONGO_URL else AsyncIOMotorClient(MONGO_URL)
db = client[DATABASE_NAME]

async def get_database():
    return db
