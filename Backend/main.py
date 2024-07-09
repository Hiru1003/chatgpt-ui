from pydantic import BaseModel, EmailStr, validator
from fastapi import FastAPI, HTTPException, Depends
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost",
    "http://localhost:3000", 
    "http://127.0.0.1:8000",
]

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Sample user storage (replace with your database or data structure)
users = {}

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# JWT settings
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30 * 24 * 60  # 30 days

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
    token_type: str

class UserInLogin(BaseModel):
    email: EmailStr
    password: str

class UserInForgotPassword(BaseModel):
    email: EmailStr

class UserInResetPassword(BaseModel):
    email: EmailStr
    new_password: str

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/login")

# Signup endpoint
@app.post("/api/signup", response_model=Token)
async def signup(user: UserInCreate):
    if user.email in users:
        raise HTTPException(status_code=409, detail="Email already registered")

    hashed_password = pwd_context.hash(user.password)
    users[user.email] = UserInDB(username=user.username, email=user.email, hashed_password=hashed_password)
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

# Forgot Password endpoint
@app.post("/api/forgot-password")
async def forgot_password(user: UserInForgotPassword):
    if user.email not in users:
        raise HTTPException(status_code=404, detail="Email not registered")
    return {"message": f"Password reset instructions sent to {user.email}"}

# Reset Password endpoint
@app.post("/api/reset-password")
async def reset_password(user: UserInResetPassword):
    if user.email not in users:
        raise HTTPException(status_code=404, detail="Email not registered")
    hashed_password = pwd_context.hash(user.new_password)
    users[user.email].hashed_password = hashed_password
    return {"message": "Password reset successful"}

# Logout endpoint (revokes token by not storing it on client-side)
@app.post("/api/logout")
async def logout(token: str = Depends(oauth2_scheme)):
    return {"message": "Logged out successfully"}
