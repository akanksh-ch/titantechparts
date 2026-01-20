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
    db.getCollection(col.name).drop(); // Clear any partial setup
    db.createCollection(col.name, { validator: schema });
    print(`--- Created ${col.name} ---`);
  } catch (e) {
    print(`--- Error creating ${col.name}: ${e.message} ---`);
  }
});

// 2. Setup Linked IDs for Seeding
const dummyUserId = ObjectId();
const dummyItemId = ObjectId();

// 3. Seed User (passwordHash MUST be 60-100 characters)
db.User.insertOne({
  _id: dummyUserId,
  email: "admin@titantech.io",
  passwordHash: "$2b$12$VE9pP86iW52IeK2S6X10.8A3.qRjG.8J7K6L5M4N3O2P1Q0R1S2T4U5V6W7X8Y9Z0",
  username: "admin_parts",
  roles: ["admin"],
  isActive: true,
  createdAt: new Date()
});

// 4. Seed Inventory
db.Inventory.insertOne({
  _id: dummyItemId,
  name: "Titanium Valve Spring",
  sku: "TT-VLV-01",
  description: "High-rpm racing springs",
  price: Double(125.50), // Must be double
  currency: "GBP",
  stock: NumberInt(48),  // Must be int
  isActive: true,
  createdAt: new Date()
});

// 5. Seed Orders (links to User and Inventory)
db.Orders.insertOne({
  userId: dummyUserId,
  amount: Double(251.00),
  currency: "GBP",
  status: "paid",
  createdAt: new Date(),
  items: [{
    inventoryId: dummyItemId,
    quantity: NumberInt(2),
    unitPrice: Double(125.50),
    lineTotal: Double(251.00)
  }]
});

print("--- Database Seeding Complete ---");
