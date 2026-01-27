// init-db.js
// Modern mongosh script for dynamic validator-based collection creation

// Switch to titantechparts database
db = db.getSiblingDB('titantechparts');

// Directory where Docker/Podman mounts your files
const initPath = '/docker-entrypoint-initdb.d/';

// 1. Discover validator files in the entrypoint directory
// Replaced listFiles() with global fs.readdirSync()
const validatorFiles = fs.readdirSync(initPath)
  .filter(fileName => fileName.match(/^Validator-.*\.JSON$/))
  .map(fileName => ({ name: fileName }));

print(`--- Found ${validatorFiles.length} validator file(s) in ${initPath} ---`);

// 2. Create collections with validators based on discovered files
validatorFiles.forEach(f => {
  // Derive collection name: Validator-User.JSON -> User
  const collectionName = f.name
    .replace(/^Validator-/, '')
    .replace(/\.JSON$/, '');

  const fullFilePath = initPath + f.name;

  try {
    // FIX: Replaced cat(f.name) with fs.readFileSync()
    // cat() does not exist in modern mongosh
    const rawData = fs.readFileSync(fullFilePath, 'utf8');
    const schema = JSON.parse(rawData);

    // Drop existing collection for clean init
    if (db.getCollectionNames().includes(collectionName)) {
      db.getCollection(collectionName).drop();
    }

    db.createCollection(collectionName, { validator: schema });
    print(`--- SUCCESS: Created collection ${collectionName} with validator from ${f.name} ---`);
  } catch (e) {
    print(`--- CRITICAL ERROR creating ${collectionName} from ${f.name}: ${e.message} ---`);
  }
});

// 3. Setup IDs for Seeding
const dummyUserId = new ObjectId();
const dummyItemId = new ObjectId();

// 4. Seed User
if (db.getCollectionNames().includes('User')) {
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
    print("--- SKIP: User collection not found ---");
}

// 5. Seed Inventory
if (db.getCollectionNames().includes('Inventory')) {
  try {
    db.Inventory.insertOne({
      _id: dummyItemId,
      name: "Performance Exhaust",
      sku: "EXH-99",
      description: "High-flow cat-back exhaust",
      price: Double(599.99), 
      currency: "GBP",
      stock: NumberInt(10), 
      isActive: true,
      createdAt: new Date()
    });
    print("--- SUCCESS: Inventory seeded ---");
  } catch (e) { print("--- FAILED Inventory seed: " + e.message); }
} else {
  print("--- SKIP: Inventory collection not found ---");
}

// 6. Seed Orders
if (db.getCollectionNames().includes('Orders')) {
  try {
    db.Orders.insertOne({
      userId: dummyUserId,
      amount: Double(599.99),
      currency: "GBP",
      status: "paid",
      createdAt: new Date(),
      items: [{
        inventoryId: dummyItemId,
        quantity: NumberInt(1),
        unitPrice: Double(599.99),
        lineTotal: Double(599.99)
      }]
    });
    print("--- SUCCESS: Orders seeded ---");
  } catch (e) { print("--- FAILED Orders seed: " + e.message); }
} else {
  print("--- SKIP: Orders collection not found ---");
}

print("--- Database initialisation complete with dynamic validators ---");
