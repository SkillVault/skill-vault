
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from fastapi import FastAPI
from database import ( create_user)

password = "bibinmongodb"

uri = f"mongodb+srv://bibs:{password}@skillvault.a9z8sqr.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri)

app = FastAPI()

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

@app.get("/")
def read_root():
    return {"Fast": "Api"}

@app.post("api/postmail")
async def post_main():
    res = await  create_user()
    return res



    



