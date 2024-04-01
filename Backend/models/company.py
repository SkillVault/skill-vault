from pydantic import BaseModel

class CompanysignUp(BaseModel):
    company_name : str
    company_email : str
    company_website : str
    password : str


class AddJob(BaseModel):
    job_title : str
    category : str
    location : str
    openings : str
    salary : str