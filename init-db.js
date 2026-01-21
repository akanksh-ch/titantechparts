// init-db.js
// Dynamic validator-based collection creation from Validator-*.JSON in CWD

// Switch to titantechparts database
db = db.getSiblingDB('titantechparts');

// 1. Discover validator files in current working directory
// mongosh provides listFiles() which returns an array of { name, isDirectory, ... }
const validatorFiles = listFiles()
  .filter(f => f.name.match(/^Validator-.*\.JSON$/));

print(`--- Found ${validatorFiles.length} validator file(s) in CWD ---`);

// 2. Create collections with validators based on discovered files
validatorFiles.forEach(f => {
  // Derive collection name: Validator-User.JSON -> User, Validator-Inventory.JSON -> Inventory, etc.
  const collectionName = f.name
    .replace(/^Validator-/, '')
    .replace(/\.JSON$/, '');

  try {
    const schema = JSON.parse(cat(f.name));

    // Drop existing collection for clean init
    if (db.getCollectionNames().includes(collectionName)) {
      db[collectionName].drop();
    }

    db.createCollection(collectionName, { validator: schema });
    print(`--- SUCCESS: Created collection ${collectionName} with validator from ${f.name} ---`);
  } catch (e) {
    print(`--- CRITICAL ERROR creating ${collectionName} from ${f.name}: ${e.message} ---`);
  }
});

// 3. Setup IDs for Seeding (example seeding still assumes User / Inventory / Orders exist)
const dummyUserId = ObjectId();
const dummyItemId = ObjectId();

// 4. Seed User (only if User collection exists)
if (db.getCollectionNames().includes('User')) {
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
} else {
  print("--- SKIP: User collection not found (no matching Validator-User.JSON?) ---");
}

// 5. Seed Inventory (only if Inventory collection exists)
if (db.getCollectionNames().includes('Inventory')) {
  try {
    db.Inventory.insertOne({
      _id: dummyItemId,
      name: "Performance Exhaust",
      sku: "EXH-99",
      description: "High-flow cat-back exhaust",
      price: Double(599.99), // Must be double
      currency: "GBP",
      stock: NumberInt(10), // Must be int
      isActive: true,
      createdAt: new Date()
    });
    print("--- SUCCESS: Inventory seeded ---");
  } catch (e) { print("--- FAILED Inventory seed: " + e.message); }
} else {
  print("--- SKIP: Inventory collection not found (no matching Validator-Inventory.JSON?) ---");
}

// 6. Seed Orders (only if Orders collection exists)
if (db.getCollectionNames().includes('Orders')) {
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
} else {
  print("--- SKIP: Orders collection not found (no matching Validator-Orders.JSON?) ---");
}

print("--- Database initialisation complete with dynamic validators ---");
