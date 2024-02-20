#database file

from model import UserInfo

# asynchronous mongodb driver
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient(
    "mongodb+srv://bibinjose:bibinmongodb@cluster0.8cod5vz.mongodb.net/?retryWrites=true&w=majority")

database = client.skillvault
collection = database.users

async def create_user(user):
    document = user
    result = await collection.insert_one(document)
    return document