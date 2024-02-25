from pydantic import BaseModel

class CreateUser(BaseModel):
   
    mailid: str
    password: str