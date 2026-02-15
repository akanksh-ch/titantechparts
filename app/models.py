from typing import Any, Dict, List, Optional
from datetime import datetime
from bson import ObjectId
from pydantic import BaseModel, Field, EmailStr, ConfigDict, field_validator

class MongoBaseModel(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)

    @field_validator("id", mode="before", check_fields=False)
    @classmethod
    def stringify_id(cls, v: Any) -> Any:
        if isinstance(v, ObjectId):
            return str(v)
        return v

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )

# --- User Models ---
class UserBase(BaseModel):
    email: EmailStr
    username: str
    roles: List[str] = ["user"]
    isActive: bool = True

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase, MongoBaseModel):
    passwordHash: str
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: Optional[datetime] = None

class UserResponse(UserBase, MongoBaseModel):
    createdAt: Optional[datetime] = None
    updatedAt: Optional[datetime] = None

# --- Auth Models ---
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class TokenData(BaseModel):
    username: Optional[str] = None

# --- Inventory Models ---
class InventoryBase(BaseModel):
    name: str
    price: float
    rating: float
    stock: int
    category: Optional[str] = None
    imageUrl: Optional[str] = None
    description: Optional[str] = None
    isActive: Optional[bool] = True
    reviews: List[Dict[str, Any]] = []

class InventoryCreate(InventoryBase):
    pass

class InventoryUpdate(BaseModel):
    name: Optional[str] = None
    sku: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    isActive: Optional[bool] = None

class InventoryInDB(InventoryBase, MongoBaseModel):
    updatedAt: Optional[datetime] = None

# --- Review Models ---
class ReviewCreate(BaseModel):
    rating: int = Field(..., ge=1, le=5)
    text: str = Field(..., min_length=3)

# --- Order Models ---

class ShippingAddress(BaseModel):
    recipientName: str = Field(..., max_length=100)
    line1: str = Field(..., min_length=1, max_length=100)
    line2: Optional[str] = Field(None, max_length=100)
    postTown: str = Field(..., max_length=35)
    postcode: str = Field(..., pattern=r"^[A-Z]{1,2}[0-9][0-9A-Z]?\s?[0-9][A-Z]{2}$")
    county: Optional[str] = Field(None, max_length=35)


class OrderItem(BaseModel):
    inventoryId: str 
    name: str
    image: Optional[str] = None
    quantity: int
    unitPrice: float
    lineTotal: float

    @field_validator("inventoryId", mode="before")
    @classmethod
    def stringify_inventory_id(cls, v):
        return str(v) if isinstance(v, ObjectId) else v

class OrderBase(BaseModel):
    userId: str
    items: List[OrderItem]
    amount: float
    currency: str
    status: str = "pending"
    address: ShippingAddress
    phoneNumber: str = Field(..., pattern=r"^\+?[1-9]\d{1,14}$")

    @field_validator("userId", mode="before")
    @classmethod
    def stringify_user_id(cls, v):
        return str(v) if isinstance(v, ObjectId) else v

class OrderItemCreate(BaseModel):
    inventoryId: str
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    address: ShippingAddress
    phoneNumber: str

class OrderInDB(OrderBase, MongoBaseModel):
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: Optional[datetime] = None
