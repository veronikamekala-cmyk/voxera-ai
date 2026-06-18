from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

interview_questions = [
    "Tell me about yourself.",
    "Why should we hire you?",
    "What are your strengths?",
    "What are your weaknesses?"
]

presentation_topics = [
    "Explain Artificial Intelligence.",
    "Discuss Climate Change.",
    "Importance of Cyber Security."
]

faculty_questions = [
    "Why are you absent today?",
    "Explain your project.",
    "Do you have any doubts?"
]

@app.get("/interview")
def interview():
    return {"question": random.choice(interview_questions)}

@app.get("/presentation")
def presentation():
    return {"topic": random.choice(presentation_topics)}

@app.get("/faculty")
def faculty():
    return {"question": random.choice(faculty_questions)}

@app.post("/feedback")
def feedback(data: dict):
    answer = data.get("answer", "")

    if len(answer) < 20:
        return {"feedback": "Try giving a more detailed answer."}

    return {
        "feedback": "Good answer. Add specific examples and maintain confidence."
    }