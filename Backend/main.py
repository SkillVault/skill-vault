from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from model import UserInfo  # Corrected import
# Ensure you import the function for database operations correctly
from database import create_user

origin = ['http://localhost:5173']

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origin,
    allow_methods=["*"],
    allow_headers=["*"],
   
)

@app.get('/')
def read_root():
    return {"Hello": "world!"}

@app.post('/api/user', response_model=UserInfo)

async def add_userdata(user: UserInfo):
    response = await  create_user(user.dict())
    if response:
        return response
    raise HTTPException(400, "something went wrong")



