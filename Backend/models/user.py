from pydantic import BaseModel

class CreateUser(BaseModel):
   
    mail_id: str
    user_name: str
    password: str


class GoogleUser(BaseModel):
    user_name: str
    user_mail: str
    profile_url: str