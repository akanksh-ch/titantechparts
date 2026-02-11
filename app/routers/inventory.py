from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.models import InventoryCreate, InventoryInDB
from app.database import db
from app.auth import get_current_active_user
from datetime import datetime
from bson import ObjectId

# Define InventoryResponse locally if not in models or patch it.
# Actually I didn't define InventoryResponse in models.py, I defined InventoryInDB.
# Let's check models.py content again via memory or just use InventoryInDB as response model.
# I used InventoryInDB. I should probably use that or create a separate response model if needed.
# For simplicity, I'll use InventoryInDB.

router = APIRouter(
    prefix="/inventory",
    tags=["inventory"],
)

@router.get("/", response_model=List[InventoryInDB])
async def read_inventory():
    inventory = await db["Inventory"].find().to_list(1000)
    result = []
    for item in inventory:
        try:
            result.append(InventoryInDB(**item))
        except Exception as e:
            print(f"Failed to validate item {item.get('_id')}: {e}")
            continue
    return result

@router.post("/", response_model=InventoryInDB)
async def create_inventory_item(item: InventoryCreate, current_user: dict = Depends(get_current_active_user)):
    # Check if user is admin? For now just allow any active user or no auth?
    # User asked for "all the routes that the frontend would need".
    # Creating stock usually requires admin.
    if "admin" not in current_user.roles:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    item_dict = item.dict()
    item_dict["createdAt"] = datetime.utcnow()
    
    result = await db["Inventory"].insert_one(item_dict)
    created_item = await db["Inventory"].find_one({"_id": result.inserted_id})
    return InventoryInDB(**created_item)

@router.get("/{id}", response_model=InventoryInDB)
async def read_inventory_item(id: str):
    if not ObjectId.is_valid(id):
        raise HTTPException(status_code=400, detail="Invalid ID format")
    
    item = await db["Inventory"].find_one({"_id": ObjectId(id)})
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
        
    return InventoryInDB(**item)
