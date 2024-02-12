# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from pymongo import MongoClient

# app = FastAPI()



# @app.get("/")
# async def read_root():
#     return {"message": "Welcome to the FastAPI server!"}


# # MongoDB configuration
# mongo_client = MongoClient("mongodb+srv://bibs:<bibinmongodb>@skillvault.a9z8sqr.mongodb.net/?retryWrites=true&w=majority")
# db = mongo_client["mydatabase"]
# collection = db["mycollection"]

# class Item(BaseModel):
#     name: str
#     description: str = None

# @app.post("/items/")
# async def create_item(item: Item):
#     item_dict = item.dict()
#     inserted_item = collection.insert_one(item_dict)
#     return {"message": "Item created successfully", "item_id": str(inserted_item.inserted_id)}


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient

app = FastAPI()

# Allowing CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your frontend URL here
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["mydatabase"]
collection = db["users"]

@app.post("/add")
async def add_user(text: str):
    user = {"text": text}
    collection.insert_one(user)
    return {"message": "User added successfully"}
