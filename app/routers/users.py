from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.models import UserCreate, UserResponse, UserInDB
from app.database import db
from app.auth import get_password_hash, get_current_active_user
from datetime import datetime

router = APIRouter(
    prefix="/users",
    tags=["users"],
)

@router.post("/", response_model=UserResponse)
async def create_user(user: UserCreate):
    existing_user = await db["Users"].find_one({"$or": [{"email": user.email}, {"username": user.username}]})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email or Username already registered")
    
    user_dict = user.dict()
    password = user_dict.pop("password")
    user_dict["passwordHash"] = get_password_hash(password)
    user_dict["createdAt"] = datetime.utcnow()
    
    # Validation happens via Model, but we must ensure we save it correctly
    # We use UserInDB to validate the full structure before inserting if we want, 
    # but here we just insert the dict.
    
    result = await db["Users"].insert_one(user_dict)
    created_user = await db["Users"].find_one({"_id": result.inserted_id})
    return UserResponse(**created_user)

@router.get("/me", response_model=UserResponse)
async def read_users_me(current_user: UserInDB = Depends(get_current_active_user)):
    return UserResponse(**current_user.dict())
