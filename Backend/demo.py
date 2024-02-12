from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient

app = FastAPI()

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
collection = db['users']  # Replace 'mycollection' with your actual collection name

# Define a Pydantic model for the data you want to save
class UserData(BaseModel):
    email: str
    password: str

# Route to handle saving data
@app.post("/api/saveData")
async def save_data(user_data: UserData):
    email = user_data.email
    password = user_data.password
    collection.insert_one({"email": email, "password": password})
    return {"message": "Data saved successfully"}
