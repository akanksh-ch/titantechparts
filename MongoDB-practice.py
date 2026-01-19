from pymongo import MongoClient



client = MongoClient("mongodb://localhost:27017/")
db = client["TitanTech"]
collection = db["Users"]

def main():
    collection.insert_one({"name": "John", "age": 30, "Role": "Stock Manager"})
    print("Database connected and document inserted.")

if __name__ == "__main__":
    main()

