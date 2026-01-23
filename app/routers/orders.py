from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from app.models import OrderCreate, OrderInDB, OrderItem
from app.database import db
from app.auth import get_current_active_user
from datetime import datetime
from bson import ObjectId

router = APIRouter(
    prefix="/orders",
    tags=["orders"],
)

@router.post("/", response_model=OrderInDB)
async def create_order(order_create: OrderCreate, current_user: dict = Depends(get_current_active_user)):
    # Calculate totals, verify stock, etc.
    # This is a complex logic step. For now, we'll do a basic implementation.
    
    items_data = []
    total_amount = 0.0
    
    # order_create.items is a list of dicts {inventoryId, quantity}
    for item in order_create.items:
        inventory_id = item["inventoryId"]
        quantity = item["quantity"]
        
        inventory_item = await db["Inventory"].find_one({"_id": ObjectId(inventory_id)})
        if not inventory_item:
             raise HTTPException(status_code=404, detail=f"Item {inventory_id} not found")
        
        if inventory_item["stock"] < quantity:
            raise HTTPException(status_code=400, detail=f"Not enough stock for {inventory_item['name']}")
            
        unit_price = inventory_item["price"]
        line_total = unit_price * quantity
        total_amount += line_total
        
        items_data.append(OrderItem(
            inventoryId=str(inventory_id),
            quantity=quantity,
            unitPrice=unit_price,
            lineTotal=line_total
        ))
        
        # Deduct stock (simplified)
        await db["Inventory"].update_one(
            {"_id": ObjectId(inventory_id)},
            {"$inc": {"stock": -quantity}}
        )

    order_dict = {
        "userId": str(current_user.id),
        "items": [item.dict() for item in items_data],
        "amount": total_amount,
        "currency": "USD", # Default or fetch from items
        "status": "pending",
        "createdAt": datetime.utcnow()
    }
    
    result = await db["Orders"].insert_one(order_dict)
    created_order = await db["Orders"].find_one({"_id": result.inserted_id})
    return OrderInDB(**created_order)

@router.get("/me", response_model=List[OrderInDB])
async def read_my_orders(current_user: dict = Depends(get_current_active_user)):
    orders = await db["Orders"].find({"userId": str(current_user.id)}).to_list(100)
    return [OrderInDB(**order) for order in orders]
