// init-db.js
// Modern mongosh script for dynamic validator-based collection creation

// Switch to titantechparts database
db = db.getSiblingDB('titantechparts');

// Directory where Docker/Podman mounts your files
const initPath = '/docker-entrypoint-initdb.d/';

// 1. Discover validator files in the entrypoint directory
// Replaced listFiles() with global fs.readdirSync()
const validatorFiles = fs.readdirSync(initPath)
  .filter(fileName => fileName.match(/^Validator-.*\.json$/))
  .map(fileName => ({ name: fileName }));

print(`--- Found ${validatorFiles.length} validator file(s) in ${initPath} ---`);

// 2. Create collections with validators based on discovered files
validatorFiles.forEach(f => {
  // Derive collection name: Validator-User.json -> User
  const collectionName = f.name
    .replace(/^Validator-/, '')
    .replace(/\.json$/, '');

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

try {
  load(initPath + "SeedInventory.js");
  print("--- SUCCESS: Loaded SeedInventory.js ---");
} catch (e) {
  print("--- SKIP/FAIL: SeedInventory.js (" + e.message + ") ---");
}

print("--- Database initialisation complete with dynamic validators ---");
