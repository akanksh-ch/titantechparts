from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, users, inventory, orders

app = FastAPI(title="TitanTechParts Backend")

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
    "*", # For development
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(inventory.router)
app.include_router(orders.router)

@app.get("/")
async def root():
    return {"message": "Welcome to TitanTechParts API"}
