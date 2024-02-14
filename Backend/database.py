import motor.motor_asyncio
from model import GetUserDetail

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/')
database = client.SkillVault
collection = database.user

async def create_user(email):
    document = email
    result = await collection.insert_one(document)
    return document