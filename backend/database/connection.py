import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = motor.motor_asyncio.AsyncIOMotorClient(MONGODB_URL)
database = client[DATABASE_NAME]

jobs_collection = database["jobs"]
papers_collection = database["papers"]

async def connect_db():
    print("✅ Connected to MongoDB successfully!")

async def close_db():
    client.close()
    print("🔴 MongoDB connection closed.")