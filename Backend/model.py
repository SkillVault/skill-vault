#models 

from pydantic import BaseModel

class UserInfo(BaseModel):
    name: str
    profimg: str
    uid: str
    mailid: str


