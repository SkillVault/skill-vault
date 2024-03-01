from fastapi import APIRouter, Form
from models.user import CreateUser,GoogleUser
from dotenv import load_dotenv
import os
from motor.motor_asyncio import AsyncIOMotorClient



load_dotenv()  # Load environment variables from .env file
MONGODB_URI = os.getenv("MONGODB_URI")
client = AsyncIOMotorClient(MONGODB_URI)
db = client.skillvault

collection = db.candidates
app = APIRouter()


@app.post("/", response_model=CreateUser)
async def add_user_data(user_info: CreateUser):
    # Insert user_info into the MongoDB collection
    await collection.insert_one(user_info.dict())
    return user_info


@app.post("/create_google_user", response_model=GoogleUser)
async def createGoogleUser(user_info: GoogleUser):
    # # Attempt to find the user in the database
    # existing_user = await collection.insert_one({"email": user_info.email})
    
    # if existing_user:
    #     # If the user exists, convert the MongoDB document to a GoogleUser model and return
    #     return GoogleUser(**existing_user)
    # else:
        # If the user does not exist, insert the new user data
        await collection.insert_one(user_info.dict())
        # Return the new user data
        return user_info



@app.get("/", response_model=GoogleUser)
async def fetchGoogleUser(user_info: GoogleUser):
    # Attempt to find the user in the database
    existing_user = await collection.find_one({"email": user_info.email})
    
    if existing_user:
        # If the user exists, convert the MongoDB document to a GoogleUser model and return
        return GoogleUser(**existing_user)
    else:
        # If the user does not exist, insert the new user data
        await collection.insert_one(user_info.dict())
        # Return the new user data
        return user_info
