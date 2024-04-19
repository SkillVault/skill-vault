from langchain_together import Together
import os
from dotenv import load_dotenv
from kor.extraction import create_extraction_chain
from kor.nodes import Object, Text
from langchain_core.messages import HumanMessage
from fastapi import APIRouter,HTTPException
from typing import Optional
from models.questions import CheckAnswer

load_dotenv()

TOGETHER_URI = os.getenv('TOGETHER_URI')

llm = Together(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    temperature=0.7,
    max_tokens=128,
    top_k=1,
    together_api_key=TOGETHER_URI,
)

schema = Object(
    id="Results",
    description="Result of user's answer",
    attributes=[
        Text(
            id="result",
            description="The age of the person in years.",
            examples=[
                (
                    ". Interviewer: True.",
                    "True",
                ),
                (
                    ". Interviewer: False. Interviewer: Task complete. Interviewer: Die.",
                    "False",
                ),
                (
                    "Interviewer: True.",
                    "True",
                ),
                (
                    "Interviewer: False.",
                    "False",
                ),
                (
                    "to define a group of related elements in HTML. Interviewer: True.",
                    "True",
                ),
                (
                    "for heading in HTML. Interviewer: False. Interviewer: Interview ended",
                    "False",
                ),
                (
                    ". Interviewer: False. (End of task) Interviewer: What tag is used to define a horizontal rule in HTML?. Interviewee: hr. ",
                    "False",
                ),
                (
                    ". Interviewer: False. (End of task) Interviewer: What tag is used to define a horizontal rule in HTML?. Interviewee: True. ",
                    "False",
                ),
                (
                    ". Interviewer: True. (End of task) Interviewer: What tag is used to define a horizontal rule in HTML?. Interviewee: False. ",
                    "True",
                ),
                (
                    ". Interviewer: True. (End of task) Interviewer: What tag is used to define a horizontal rule in HTML?. Interviewee: False. ",
                    "True",
                ),
            ],
        ),
    ],
    many=True,
)


def interviewer(subject: str,question: str, answer: str):
    prompt = f"You are a {subject} developer engineer withover 15 years of experience, currently you're tasked with the hiring process to select new employees as an interviewer. Your task is to interview the potential candidates. Here is the instrucrion you've to follow and should not break: 1.'The interviewers task is to gauge the accuracy/correctness of the answer provided by the interviewee, if the answer provided is satisfied by the interviewer around 30% then respond with True if not then respond with False only'. 2.'The interviewer must not respond with the answer in any other way than with the instructed words which are True or False and after responding with True or False end your task and you word limit is 5 and no more' 3.'If the answer is wrong in the next dialog the correct answer should be given by the Interviewer.' Let me give a few examples on how the conversation should be : Example 1 :'Interviewer: What is React? Interviewee: It is a JavaScript Library. Interviewer: True' Example 2: 'Interviewer: What does JSX stand for in React? Interviewee: JavaScript XML. Interviewer: True' Example 3: 'Interviewer: What does JSX stand for in React? Interviewee: I don't know. Interviewer: False Interviewer: Correct Answer : JavaScript XML' Example 4: 'Interviewer: What does React use to handle data changes and re-render components? Interviewee: I don't know. Interviewer: False Interviewer: Correct Answer : State and prop' Example 5: 'Interviewer: In React, what do you use to pass data from parent to child components? Interviewee: I don't know. Interviewer: False Interviewer: Correct Answer : Props' Example 6: 'Interviewer: What is the core principle behind React's component-based architecture? Interviewee: Reusability. Interviewer: True' Example 7:'Interviewer: What attribute is used to specify the relationship between the current document and the linked document in HTML? Interviewee: Relation attribute. Interviewer: False Interviewer: Correct Answer : rel  attribute'    Follow the same pattern as the one above.Let's begin: Interviewer:{question}. Interviewee: {answer}"
    data = llm.invoke([HumanMessage(content=prompt)])
    print(prompt)
    print("\n\n\n")
    print(data)
    # chain = create_extraction_chain(llm, schema, encoder_or_encoder_class="json")
    # data = chain.invoke((data))["text"]["data"]["Results"][0]["result"]
    # data = data == "True" if True else False
    return data



router = APIRouter()

@router.post("/check_answer",response_model=str)
def check_answer(subject:str ,dialog: CheckAnswer):
    try:
        response = interviewer(subject,dialog.question,dialog.answer)
        return response
    except HTTPException as e:
        raise HTTPException(status_code=e.status_code, detail=str(e.detail))
