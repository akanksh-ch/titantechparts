// Switch to titantechparts database
db = db.getSiblingDB('titantechparts');

const configs = [
  { name: 'User', file: '/docker-entrypoint-initdb.d/Validator-User.JSON' },
  { name: 'Inventory', file: '/docker-entrypoint-initdb.d/Validator-Inventory.JSON' },
  { name: 'Orders', file: '/docker-entrypoint-initdb.d/Validator-Orders.JSON' }
];

// 1. Create Collections with Validators
configs.forEach(col => {
  try {
    const schema = JSON.parse(cat(col.file));
    db.getCollection(col.name).drop(); 
    db.createCollection(col.name, { validator: schema });
    print(`--- SUCCESS: Created collection ${col.name} ---`);
  } catch (e) {
    print(`--- CRITICAL ERROR creating ${col.name}: ${e.message} ---`);
  }
});

// 2. Setup IDs for Seeding
const dummyUserId = ObjectId();
const dummyItemId = ObjectId();

// 3. Seed User
// passwordHash MUST be 60-100 characters
try {
  db.User.insertOne({
    _id: dummyUserId,
    email: "test@titantech.io",
    passwordHash: "$2b$12$Kcy9pP86iW52IeK2S6X10.8A3.qRjG.8J7K6L5M4N3O2P1Q0R1S2T4U5V6W7X8Y9Z0", 
    username: "test_user",
    roles: ["user"],
    isActive: true,
    createdAt: new Date()
  });
  print("--- SUCCESS: User seeded ---");
} catch (e) { print("--- FAILED User seed: " + e.message); }

// 4. Seed Inventory
try {
  db.Inventory.insertOne({
    _id: dummyItemId,
    name: "Performance Exhaust",
    sku: "EXH-99",
    description: "High-flow cat-back exhaust",
    price: Double(599.99), // Must be double
    currency: "GBP",
    stock: NumberInt(10),  // Must be int
    isActive: true,
    createdAt: new Date()
  });
  print("--- SUCCESS: Inventory seeded ---");
} catch (e) { print("--- FAILED Inventory seed: " + e.message); }

// 5. Seed Orders
try {
  db.Orders.insertOne({
    userId: dummyUserId,
    amount: Double(599.99), // Must be double
    currency: "GBP",
    status: "paid",
    createdAt: new Date(),
    items: [{
      inventoryId: dummyItemId,
      quantity: NumberInt(1), // Must be int
      unitPrice: Double(599.99),
      lineTotal: Double(599.99)
    }]
  });
  print("--- SUCCESS: Orders seeded ---");
} catch (e) { print("--- FAILED Orders seed: " + e.message); }
