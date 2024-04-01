import os
from dotenv import load_dotenv
from models.company import CompanysignUp,AddJob
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import APIRouter


load_dotenv()  # Load environment variables from .env file
MONGODB_URI = os.getenv("MONGODB_URI")
client = AsyncIOMotorClient(MONGODB_URI)
db = client.skillvault
collection = db.jobposts
app = APIRouter()

@app.post("/signup", response_model=CompanysignUp)
async def add_company_data(company_info: CompanysignUp):
    # Insert user_info into the MongoDB collection
    await collection.insert_one(company_info.dict())
    return company_info

@app.post("/add_job", response_model=AddJob)
async def postjob(add_job: AddJob):
    # Insert user_info into the MongoDB collection
    await collection.insert_one(add_job.dict())
    return company_info
