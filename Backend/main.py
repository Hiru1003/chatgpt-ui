from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

app = FastAPI()

# Sample user storage (replace with your database or data structure)
users = {}

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Token functions
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
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
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserInLogin(BaseModel):
    email: str
    password: str

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

# Signup endpoint
@app.post("/api/signup", response_model=Token)
async def signup(user: UserInCreate):
    if user.email in users:
        raise HTTPException(status_code=409, detail="Email already registered")

    hashed_password = pwd_context.hash(user.password)
    users[user.email] = UserInDB(**user.dict(), hashed_password=hashed_password)
    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

# Verify password
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Authenticate user
def authenticate_user(email: str, password: str):
    user = users.get(email)
    if not user or not verify_password(password, user.hashed_password):
        return False
    return user

# Login endpoint
@app.post("/api/login", response_model=Token)
async def login(user: UserInLogin):
    authenticated_user = authenticate_user(user.email, user.password)
    if not authenticated_user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}

# Test endpoint to get current user
@app.get("/api/users/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = users.get(email)
    if user is None:
        raise credentials_exception
    return user

    

# How to run Backend
# python -m venv venv
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process 
# .\venv\Scripts\activate
# uvicorn main:app --reload
