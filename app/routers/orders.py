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
        inventory_id = item.inventoryId
        quantity = item.quantity
        
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
            name=inventory_item["name"],
            image=inventory_item.get("imageUrl") or inventory_item.get("image"), # Handle both keys if inconsistent
            quantity=quantity,
            unitPrice=unit_price,
            lineTotal=line_total
        ))
        
        # Deduct stock (simplified)
        await db["Inventory"].update_one(
            {"_id": ObjectId(inventory_id)},
            {"$inc": {"stock": -quantity}}
        )

    
    # helper for E.164 phone validation (simple UK fix for now)
    phone_clean = order_create.phoneNumber.strip().replace(" ", "").replace("-", "")
    if phone_clean.startswith('0'):
        phone_clean = '+44' + phone_clean[1:]

    # Prepare address (uppercase postTown)
    address_dict = order_create.address.dict(exclude_none=True)
    if 'postTown' in address_dict:
        address_dict['postTown'] = address_dict['postTown'].upper()

    order_dict = {
        "userId": ObjectId(str(current_user.id)),
        "items": [{
            "inventoryId": ObjectId(item.inventoryId),
            "quantity": item.quantity,
            "unitPrice": item.unitPrice,
            "lineTotal": item.lineTotal
        } for item in items_data],
        "amount": total_amount,
        "currency": "USD", # Default or fetch from items
        "status": "pending",
        "createdAt": datetime.utcnow(),
        "address": address_dict,
        "phoneNumber": phone_clean
    }
    
    try:
        result = await db["Orders"].insert_one(order_dict)
        
        created_order = await db["Orders"].find_one({"_id": result.inserted_id})
        
        # Prepare the response using the original items_data which has names and images
        # created_order from DB lacks name/image in items due to validator
        response_order_dict = created_order.copy()
        response_order_dict['items'] = items_data
        
        return OrderInDB(**response_order_dict)

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Order processing error: {str(e)}")

@router.get("/me", response_model=List[OrderInDB])
@router.get("/me", response_model=List[OrderInDB])
async def read_my_orders(current_user: dict = Depends(get_current_active_user)):
    try:
        orders = await db["Orders"].find({"userId": ObjectId(str(current_user.id))}).to_list(100)
    except Exception:
        orders = []
    
    if not orders:
        return []

    try:
        # Enrich orders with product details (name, image) from Inventory
        # 1. Collect all unique inventoryIds
        inventory_ids = set()
        for order in orders:
            for item in order.get("items", []):
                if "inventoryId" in item:
                    # InventoryId in DB items might be ObjectId or str depending on insertion
                    inventory_ids.add(item["inventoryId"])
        
        # 2. Fetch all inventory items
        inventory_map = {}
        if inventory_ids:
            # Convert all to ObjectId for query
            obj_ids = []
            for iid in inventory_ids:
                try:
                    obj_ids.append(ObjectId(iid))
                except:
                    pass
                    
            if obj_ids:
                inventory_items = await db["Inventory"].find({"_id": {"$in": obj_ids}}).to_list(len(obj_ids))
                for inv in inventory_items:
                    inventory_map[str(inv["_id"])] = inv
                
        # 3. Enrich order items
        enriched_orders = []
        for order in orders:
            enriched_items = []
            for item in order.get("items", []):
                inv_id_str = str(item.get("inventoryId"))
                inv_details = inventory_map.get(inv_id_str)
                
                if inv_details:
                    # Create OrderItem with details from inventory
                    enriched_items.append(OrderItem(
                        inventoryId=inv_id_str,
                        name=inv_details["name"],
                        image=inv_details.get("imageUrl") or inv_details.get("image"),
                        quantity=item["quantity"],
                        unitPrice=item["unitPrice"],
                        lineTotal=item["lineTotal"]
                    ))
                else:
                    # Fallback if inventory item invalid/deleted
                    enriched_items.append(OrderItem(
                        inventoryId=inv_id_str,
                        name="Unknown Item", # Fallback name
                        quantity=item["quantity"],
                        unitPrice=item["unitPrice"],
                        lineTotal=item["lineTotal"]
                    ))
            
            # Create a copy of order to modify items
            order_copy = order.copy()
            order_copy['items'] = enriched_items
            enriched_orders.append(OrderInDB(**order_copy))
            
        return enriched_orders
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Failed to fetch order history: {str(e)}")
