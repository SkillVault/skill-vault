import os
from models.company import CompanyLogin,CompanysignUp,CompanyInfo
from fastapi import HTTPException 
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi import APIRouter


load_dotenv()
MONGODB_URI="mongodb+srv://bibinjose:bibinmongodb@cluster0.8cod5vz.mongodb.net/?retryWrites=true&w=majority"
client = AsyncIOMotorClient(MONGODB_URI)
db = client.skillvault
collection = db.companies
app = APIRouter()

async def signup(companyName: str, email: str,website: str, password: str ) -> CompanysignUp:
    company_data = CompanyLogin(
        companyName=companyName,
        password=password,
        website=website,
        email=email,
    )
    print(company_data)
    result = await collection.insert_one(company_data.dict())

    if result.inserted_id:
        return {"message" : "Company sign up successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to sign up company")
    


async def login(email: str) -> dict:
    company_data = await collection.find_one({"email": email})
    

    if company_data:
        return {
            "password": company_data["password"],
        }
    if company_data:
        return CompanyInfo(**company_data)
    else:
        raise HTTPException(status_code=404, detail="Company not found") 