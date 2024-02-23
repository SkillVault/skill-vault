from fastapi import FastAPI
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Configuring CORS for your FastAPI app
origins = ["http://localhost:5173"]  # Assuming your React app runs on localhost:3000
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup MongoDB connection
client = MongoClient("mongodb+srv://bibinjose:bibinmongodb@cluster0.8cod5vz.mongodb.net/?retryWrites=true&w=majority")
db = client.skillvault
collection = db.Flutter

# Pydantic model to parse the questions documents from MongoDB
class Question(BaseModel):
    Q_No: int
    Question: str
    Answer: str
    Level: int

@app.get("/questions/{question_number}", response_model=Question)
async def get_question(question_number: int):
    question = await collection.find_one({"Q No": question_number})
    if question:
        return question
    return {"message": "Question not found"}

# Run the server with: uvicorn your_file_name:app --reload
