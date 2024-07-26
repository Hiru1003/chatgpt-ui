from datetime import datetime, timedelta
from typing import Optional
from typing import List
import os
import json
import http.client
import uuid
from bson import ObjectId 

from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, validator,Field
from jose import jwt, JWTError
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError

# FastAPI instance
app = FastAPI()

# CORS middleware configuration
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1:8000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


# MongoDB connection
client = MongoClient("mongodb+srv://hirumi:pqDH0vehCYQ0P3F5@cluster0.0awi5vi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["chatgpt_web"] 
users_collection = db["users"]
response_collection = db["chat_thread"]


# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = "CoJsCG9ueQIF-xGL7H2iOTWH1ot9jZQbwr5Wwc6yim8"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 24 * 60  # 30 days

# Token functions
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Pydantic models
class UserInDB(BaseModel):
    username: str
    email: str
    hashed_password: str

class UserInCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    confirm_password: str

    @validator("confirm_password")
    def passwords_match(cls, v, values, **kwargs):
        if 'password' in values and v != values['password']:
            raise ValueError("Passwords do not match")
        return v

class Token(BaseModel):
    access_token: str

class UserInLogin(BaseModel):
    email: EmailStr
    password: str

class UserInForgotPassword(BaseModel):
    email: EmailStr

class UserInResetPassword(BaseModel):
    email: EmailStr
    new_password: str
    confirm_password: str

    @validator("confirm_password")
    def passwords_match(cls, v, values, **kwargs):
        if 'new_password' in values and v != values['new_password']:
            raise ValueError("Passwords do not match")
        return v

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")



# Verify password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)



# Authenticate user
def authenticate_user(email: str, password: str):
    user = users_collection.find_one({"email": email})
    if not user or not verify_password(password, user["hashed_password"]):
        return False
    return user



# Signup endpoint
@app.post("/api/signup", response_model=Token)
async def signup(user: UserInCreate):
    user_dict = user.dict()
    user_dict["hashed_password"] = pwd_context.hash(user.password)
    del user_dict["password"]
    del user_dict["confirm_password"]

    try:
        users_collection.insert_one(user_dict)
    except DuplicateKeyError:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")

    token = create_access_token(data={"sub": user.email})
    return {"access_token": token}



# Login endpoint
@app.post("/api/login", response_model=Token)
async def login(user: UserInLogin):
    authenticated_user = authenticate_user(user.email, user.password)
    if not authenticated_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token(data={"sub": user.email})
    return {"access_token": token}



# Forgot Password endpoint
@app.post("/api/forgot-password")
async def forgot_password(user: UserInForgotPassword):
    if not users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Email not registered")
    return {"message": f"Password reset instructions sent to {user.email}"}



# Reset Password endpoint
@app.post("/api/reset-password")
async def reset_password(user: UserInResetPassword):
    if not users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Email not registered")
    if user.new_password != user.confirm_password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")
    hashed_password = pwd_context.hash(user.new_password)
    users_collection.update_one({"email": user.email}, {"$set": {"hashed_password": hashed_password}})
    return {"message": "Password reset successful"}



# Logout endpoint (revokes token by not storing it on client-side)
@app.post("/api/logout")
async def logout(token: str = Depends(oauth2_scheme)):
    return {"message": "Logged out successfully"}










# Response
class Message(BaseModel):
    role: str
    content: str

class TextRequest(BaseModel):
    text: str

class TextResponse(BaseModel):
    messages: List[Message]
    topic: str
    chat_id: str

class ChatSession(BaseModel):
    chat_id: str
    topic: str
    messages: List[Message]

def generate_topic(prompt: str) -> str:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="API key not found")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "Generate a relevant and concise 25-character topic for the following content:"},
            {"role": "user", "content": prompt}
        ],
        "max_tokens": 50
    }

    json_payload = json.dumps(payload)
    conn = http.client.HTTPSConnection("api.openai.com")
    conn.request("POST", "/v1/chat/completions", body=json_payload, headers=headers)
    response = conn.getresponse()
    response_data = response.read().decode()
    conn.close()

    response_json = json.loads(response_data)
    topic = response_json['choices'][0]['message']['content'].strip()
    return topic[:25]  # Ensure the topic is up to 25 characters

@app.post("/bot/response", response_model=TextResponse)
async def get_bot_response(request: TextRequest):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="API key not found")

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "system", "content": "You are a friendly assistant, skilled in providing helpful and engaging responses to a variety of everyday life questions."},
            {"role": "user", "content": request.text}
        ]
    }

    json_payload = json.dumps(payload)
    conn = http.client.HTTPSConnection("api.openai.com")
    conn.request("POST", "/v1/chat/completions", body=json_payload, headers=headers)
    response = conn.getresponse()
    response_data = response.read().decode()
    conn.close()

    response_json = json.loads(response_data)
    response_text = response_json['choices'][0]['message']['content']

    message_request = Message(role="user", content=request.text)
    message_response = Message(role="assistant", content=response_text)

    # Generate a new chat ID if not provided
    chat_id = str(ObjectId())

    chat_session = response_collection.find_one({"chat_id": chat_id})

    if not chat_session:
        topic = generate_topic(request.text)
        new_chat = ChatSession(
            chat_id=chat_id,
            topic=topic,
            messages=[message_request.dict(), message_response.dict()]
        )
        result = response_collection.insert_one(new_chat.dict())
        if not result.inserted_id:
            raise HTTPException(status_code=500, detail="Failed to save response to database")
    else:
        response_collection.update_one(
            {"chat_id": chat_id},
            {"$push": {"messages": {"$each": [message_request.dict(), message_response.dict()]}}}
        )
        if not chat_session.get('topic'):
            topic = generate_topic(request.text)
            response_collection.update_one(
                {"chat_id": chat_id},
                {"$set": {"topic": topic}}
            )

    updated_chat_session = response_collection.find_one({"chat_id": chat_id})
    if not updated_chat_session:
        raise HTTPException(status_code=500, detail="Failed to retrieve chat session")

    messages = [Message(**msg) for msg in updated_chat_session['messages']]
    topic = updated_chat_session.get('topic', None)

    return TextResponse(messages=messages, topic=topic, chat_id=chat_id)













# @app.post("/bot/response", response_model=TextResponse)
# async def get_bot_response(request: TextRequest):
#     # Prepare the request data
#     api_key = os.getenv("OPENAI_API_KEY")
#     headers = {
#         "Authorization": f"Bearer {api_key}",
#         "Content-Type": "application/json"
#     }
#     payload = {
#         "model": "gpt-3.5-turbo",
#         "messages": [
#             {"role": "system", "content": "You are a friendly assistant, skilled in providing helpful and engaging responses to a variety of everyday life questions."},
#             {"role": "user", "content": request.text}
#         ]
#     }

#     # Convert payload to JSON
#     json_payload = json.dumps(payload)

#     # Create a connection to the OpenAI API
#     conn = http.client.HTTPSConnection("api.openai.com")

#     # Send the request to OpenAI API
#     conn.request("POST", "/v1/chat/completions", body=json_payload, headers=headers)

#     # Get the response from OpenAI API
#     response = conn.getresponse()
#     response_data = response.read().decode()

#     # Close the connection
#     conn.close()

#     # Parse the JSON response
#     response_json = json.loads(response_data)
#     response_text = response_json['choices'][0]['message']['content']

#     # Save the request and response to the database
#     response_data = {
#         "request": request.text,
#         "response": response_text
#     }
#     result = response_collection.insert_one(response_data)
#     if not result.inserted_id:
#         raise HTTPException(status_code=500, detail="Failed to save response to database")

#     return {"text": response_text}


# Add initial data to MongoDB 
# @app.on_event("startup")
# async def startup_event():
#     initial_data = [
#         {"chatId": "1", "text": "Recipe for cake"},
#         {"chatId": "2", "text": "Coding with python"},
#         {"chatId": "3", "text": "React app with python"},
#         {"chatId": "4", "text": "How to make a diy table"},
#         {"chatId": "5", "text": "SE project ideas"},
#         {"chatId": "6", "text": "Remake the house style"},
#         {"chatId": "7", "text": "Breakfast ideas"},
#         {"chatId": "8", "text": "OOP concepts"},
#         {"chatId": "9", "text": "Meal plan generator"},
#         {"chatId": "10", "text": "Port change solution"},
#         {"chatId": "11", "text": "Code solution"}
#     ]
#     if chat_collection.count_documents({}) == 0: 
#         chat_collection.insert_many(initial_data)







# chat
# class ChatItem(BaseModel):
#     chatId: str
#     text: str

# class RenameRequest(BaseModel):
#     new_name: str

# @app.get("/api/chat/")
# async def get_chat_history():
#     chat_items = chat_collection.find()
#     return [ChatItem(chatId=item['chatId'], text=item['text']) for item in chat_items]

# @app.put("/api/chat/rename/{chat_id}")
# async def rename_chat_item(chat_id: str, request: RenameRequest):
#     result = chat_collection.update_one(
#         {'chatId': chat_id},
#         {'$set': {'text': request.new_name}}
#     )
#     if result.modified_count > 0:
#         return {"message": "Rename successful"}
#     else:
#         raise HTTPException(status_code=404, detail="Chat not found")

# @app.delete("/api/chat/delete/{chat_id}")
# async def delete_chat_item(chat_id: str):
#     result = chat_collection.delete_one({'chatId': chat_id})
#     if result.deleted_count > 0:
#         return {"message": "Delete successful"}
#     else:
#         raise HTTPException(status_code=404, detail="Chat not found")













# #chat name
# class TextRequest(BaseModel):
#     text: str

# class ChatItem(BaseModel):
#     chatId: str
#     text: str

# @app.post("/bot/chat_name", response_model=ChatItem)
# async def start_new_chat(request: TextRequest):
#     # Generate a new chat ID
#     new_chat_id = str(uuid.uuid4())
    
#     # Generate chat topic using OpenAI API
#     api_key = os.getenv("OPENAI_API_KEY", "sk-proj-mOUCsyRcLMHDKva2qrInT3BlbkFJOoOza5bzwYZciugO2J2o")
#     if not api_key:
#         raise HTTPException(status_code=500, detail="OPENAI_API_KEY is not set.")
        
#     headers = {
#         "Authorization": f"Bearer {api_key}",
#         "Content-Type": "application/json"
#     }
#     topic_payload = {
#         "model": "gpt-3.5-turbo",
#         "messages": [
#             {"role": "system", "content": "You are a helpful assistant for generating chat topics."},
#             {"role": "user", "content": f"Generate a topic for: {request.text}. The topic should be concise and less than 25 characters."}
#         ]
#     }
#     json_topic_payload = json.dumps(topic_payload)

#     try:
#         # Create a connection to the OpenAI API for generating the chat topic
#         conn = http.client.HTTPSConnection("api.openai.com")
#         conn.request("POST", "/v1/chat/completions", body=json_topic_payload, headers=headers)
#         response = conn.getresponse()
#         response_data = response.read().decode()
#         conn.close()

#         # Parse the JSON response
#         response_json = json.loads(response_data)
#         chat_topic = response_json['choices'][0]['message']['content'].strip()

#         # Ensure the topic is less than 25 characters
#         if len(chat_topic) > 25:
#             chat_topic = chat_topic[:25]

#     except Exception as e:
#         print(f"Error contacting OpenAI API: {e}")
#         raise HTTPException(status_code=500, detail="Error contacting OpenAI API")

#     # Save the new chat item to the database
#     chat_item = {
#         "chatId": new_chat_id,
#         "text": chat_topic
#     }
    
#     try:
#         result = chat_collection.insert_one(chat_item)
#         if not result.inserted_id:
#             raise HTTPException(status_code=500, detail="Failed to save new chat item")
#     except Exception as e:
#         print(f"Database error: {e}")
#         raise HTTPException(status_code=500, detail="Database error")

#     return ChatItem(chatId=new_chat_id, text=chat_topic)





# Endpoint to get a chat item by ID
# @app.get("/api/chat/{chat_id}", response_model=ChatItem)
# async def get_chat_item(chat_id: str):
#     chat_item = chat_collection.find_one({"chatId": chat_id})
#     if chat_item:
#         return ChatItem(chatId=chat_item['chatId'], text=chat_item['text'])
#     else:
#         raise HTTPException(status_code=404, detail="Chat not found")


        

# How to run Backend
# python -m venv venv
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
# .\venv\Scripts\activate
# uvicorn main:app --reload or python -m uvicorn main:app --reload

# MongoDB password: pqDH0vehCYQ0P3F5
# Username: hirumi