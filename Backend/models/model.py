#models 

from pydantic import BaseModel, Field

class CreateUser(BaseModel):
   
    mailid: str
    password: str


class FetchQuestion(BaseModel):
    
    QNo: int 
    Question: str
    Answer: str
    Level: int