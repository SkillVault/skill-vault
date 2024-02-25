from fastapi import APIRouter, Form
from models.user import CreateUser
from dotenv import load_dotenv
import os
from motor.motor_asyncio import AsyncIOMotorClient



load_dotenv()  # Load environment variables from .env file
MONGODB_URI = os.getenv("MONGODB_URI")
client = AsyncIOMotorClient(MONGODB_URI)
db = client.skillvault

collection = db.users
app = APIRouter()


@app.post("/", response_model=CreateUser)
async def add_user_data(user_info: CreateUser):
    # Insert user_info into the MongoDB collection
    await collection.insert_one(user_info.dict())
    return user_info