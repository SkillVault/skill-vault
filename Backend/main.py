from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from transformers import BertTokenizer, BertModel
import torch
from scipy.spatial.distance import cosine
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import List, Optional
from fastapi.responses import JSONResponse

# Ensure you import the function for database operations correctly
# from database import create_user, create_questions  # Assuming you'll add a new function for question insertion

origin = ['http://localhost:5173']

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
   
)

@app.get('/')
def read_root():
    return {"message": "Welcome to skillvault"}



# Setup MongoDB connection
client = AsyncIOMotorClient("mongodb+srv://bibinjose:bibinmongodb@cluster0.8cod5vz.mongodb.net/?retryWrites=true&w=majority")
db = client.skillvault
collection = db.Flutter
collection1 = db.users

class UserInfo(BaseModel):
    mailid: str
    password: str

@app.post('/api/user', response_model=UserInfo)
async def add_user_data(user_info: UserInfo):
    # Insert user_info into the MongoDB collection
    await collection1.insert_one(user_info.dict())
    return user_info
   


class Question(BaseModel):
    
    Q_No: int = Field(..., alias="Q No")
    Question: str
    Answer: str
    Level: int

  

@app.get("/questions/", response_model=Question)
async def get_question(Q_No: int):
    try:
        question_document = await collection.find_one({"Q No": Q_No})
        if question_document:
            return Question(**question_document)
        else:
            raise HTTPException(status_code=404, detail="Question not found")
    except ValueError as e:  # If Q_No is not an integer
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:  # Catch all other exceptions
        return JSONResponse(
            status_code=500,
            content={"message": "An error occurred", "error": str(e)},
        )

class TextPair(BaseModel):
    text1: str
    text2: str

def bert_text_similarity(text1, text2, model_name='bert-base-uncased'):
    tokenizer = BertTokenizer.from_pretrained(model_name)
    model = BertModel.from_pretrained(model_name)

    inputs1 = tokenizer(text1, return_tensors='pt', padding=True, truncation=True, max_length=512)
    inputs2 = tokenizer(text2, return_tensors='pt', padding=True, truncation=True, max_length=512)

    with torch.no_grad():
        outputs1 = model(**inputs1)
        outputs2 = model(**inputs2)

    embeddings1 = outputs1.last_hidden_state.mean(dim=1)
    embeddings2 = outputs2.last_hidden_state.mean(dim=1)

    similarity = 1 - cosine(embeddings1[0].numpy(), embeddings2[0].numpy())
    return similarity

@app.post("/text-similarity/")
async def compute_similarity(pair: TextPair):
    similarity = bert_text_similarity(pair.text1, pair.text2)
    return {"similarity": similarity}