import os
from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
import uvicorn
from db.core import get_db
from db.repositories.base import health_check
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated

load_dotenv()
app = FastAPI()


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


conn = get_db()
next(conn)


@app.get("/")
def read_root():
    return {"message": "api backend"}


@app.get("/db-health")
def db_health_check(db=Depends(get_db)):
    health = health_check(db)
    return {"message": "Connection successful", "status": health}


# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# class User(BaseModel):
#     username: str
#     email: str | None = None
#     full_name: str | None = None
#     disabled: bool | None = None


# class UserInDB(User):
#     hashed_password: str

# # this middleware if extract token and decode it then add user to request that how done in Express
# async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = TokenData(username=username)
#     except InvalidTokenError:
#         raise credentials_exception
#     user = get_user(fake_users_db, username=token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user


@app.post("/signup")
def signup():
    return "OK"


@app.post("/signin")
async def signin(form_data: Annotated[OAuth2PasswordRequestForm, Depends()]):
    # user_dict = fake_users_db.get(form_data.username)
    # if not user_dict:
    #     raise HTTPException(status_code=400, detail="Incorrect username or password")
    # user = UserInDB(**user_dict)
    # hashed_password = fake_hash_password(form_data.password)
    # if not hashed_password == user.hashed_password:
    #     raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": "user.username", "token_type": "bearer"}


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


@app.post("/room")
def room(token: Annotated[str, Depends(oauth2_scheme)]):
    "Restricted Room"
    return token


def start():
    """Entry point for the 'api' script."""
    uvicorn.run(
        app="api.main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=True,
    )
