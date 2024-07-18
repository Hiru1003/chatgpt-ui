from datetime import datetime, timedelta
from typing import Optional

from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, validator
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
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# MongoDB connection
client = MongoClient("mongodb+srv://hirumi:pqDH0vehCYQ0P3F5@cluster0.0awi5vi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["chatgpt_web"] 
users_collection = db["users"]
response_collection = db["response"]
chats_collection = db["chats"]

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

# Bot Response
class TextRequest(BaseModel):
    text: str

class TextResponse(BaseModel):
    text: str

class ChatRenameRequest(BaseModel):
    new_name: str

    
@app.post("/bot/response", response_model=TextResponse)
async def get_bot_response(request: TextRequest):
    response_text = "Hi, how can I assist you?"
    response_data = {"request": request.text, "response": response_text}
    response_collection.insert_one(response_data)
    return {"text": response_text}


# Rename Chat endpoint
@app.put("/api/chat/rename/{chat_id}")
async def rename_chat(chat_id: str, new_name: str):
    try:
        result = chats_collection.update_one(
            {"_id": ObjectId(chat_id)},
            {"$set": {"name": new_name}}
        )
        if result.modified_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Chat not found")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    return {"message": "Chat renamed successfully"}

# Delete Chat endpoint
@app.delete("/api/chat/delete/{chat_id}")
async def delete_chat(chat_id: str):
    try:
        result = chats_collection.delete_one({"_id": ObjectId(chat_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Chat not found")
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

    return {"message": "Chat deleted successfully"}




# How to run Backend
# python -m venv venv
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
# .\venv\Scripts\activate
# uvicorn main:app --reload

# MongoDB password: pqDH0vehCYQ0P3F5
# Username: hirumi
