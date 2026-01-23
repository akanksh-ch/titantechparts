from pydantic import BaseModel, Field, EmailStr, ConfigDict
from typing import List, Optional, Any
from datetime import datetime
from bson import ObjectId
from pydantic_core import core_schema

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(
        cls, _source_type: Any, _handler: Any
    ) -> core_schema.CoreSchema:
        return core_schema.json_or_python_schema(
            json_schema=core_schema.str_schema(),
            python_schema=core_schema.union_schema([
                core_schema.is_instance_schema(ObjectId),
                core_schema.no_info_plain_validator_function(cls.validate),
            ]),
            serialization=core_schema.plain_serializer_function_ser_schema(
                lambda x: str(x)
            ),
        )

    @classmethod
    def validate(cls, v: Any) -> ObjectId:
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

class MongoBaseModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

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
    createdAt: datetime
    updatedAt: Optional[datetime] = None

# --- Inventory Models ---
class InventoryBase(BaseModel):
    name: str
    sku: str
    description: Optional[str] = None
    price: float
    currency: str = "USD"
    stock: int
    isActive: bool = True

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
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: Optional[datetime] = None

# --- Order Models ---
class OrderItem(BaseModel):
    inventoryId: str 
    quantity: int
    unitPrice: float
    lineTotal: float

class OrderBase(BaseModel):
    userId: str
    items: List[OrderItem]
    amount: float
    currency: str
    status: str = "pending"

class OrderCreate(BaseModel):
    items: List[dict]

class OrderInDB(OrderBase, MongoBaseModel):
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: Optional[datetime] = None
