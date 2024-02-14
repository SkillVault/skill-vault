from pydantic import BaseModel

class GetUserDetail(BaseModel):
    email:str