db = db.getSiblingDB('titantechparts');

db.Inventory.insertMany([

{
_id: ObjectId("665f1f77bcf86cd799439001"),
name: "NVIDIA GeForce RTX 4090 24GB GDDR6X",
price: 2099.99,
rating: 4.8,
reviews: [],
imageUrl: "./images/NVIDIA-GeForce-RTX-4090-24GB-GDDR6X.jpg",
category: "GPU",
stock: 12,
createdAt: new Date("2025-11-01T08:00:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799439002"),
name: "AMD Radeon RX 7900 XTX 24GB GDDR6",
price: 1399.99,
rating: 4.6,
reviews: [],
imageUrl: "./images/AMD-Radeon-RX-7900-XTX-24GB-GDDR6.jpg",
category: "GPU",
stock: 25,
createdAt: new Date("2025-11-05T10:15:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799439003"),
name: "NVIDIA GeForce RTX 4070 SUPER 12GB GDDR6X",
price: 749.99,
rating: 4.4,
reviews: [],
imageUrl: "./images/NVIDIA-GeForce-RTX-4070-SUPER-12GB-GDDR6X.jpg",
category: "GPU",
stock: 40,
createdAt: new Date("2025-11-10T09:30:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799439004"),
name: "NVIDIA GeForce RTX 4060 Ti 8GB GDDR6",
price: 449.99,
rating: 4.1,
reviews: [],
imageUrl: "./images/NVIDIA-GeForce-RTX-4060-Ti-8GB-GDDR6.jpg",
category: "GPU",
stock: 60,
createdAt: new Date("2025-11-12T14:50:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799439005"),
name: "AMD Radeon RX 7800 XT 16GB GDDR6",
price: 599.99,
rating: 4.3,
reviews: [],
imageUrl: "./images/AMD-Radeon-RX-7800-XT-16GB-GDDR6.jpg",
category: "GPU",
stock: 33,
createdAt: new Date("2025-11-18T07:45:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799430001"),
name: "Intel Core i9-14900K",
price: 649.99,
rating: 4.7,
reviews: [],
imageUrl: "./images/Intel-Core-i9-14900K.jpg",
category: "CPU",
stock: 35,
createdAt: new Date("2025-11-01T08:00:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799430002"),
name: "AMD Ryzen 9 7950X",
price: 579.99,
rating: 4.6,
reviews: [],
imageUrl: "./images/AMD-Ryzen-9-7950X.jpg",
category: "CPU",
stock: 22,
createdAt: new Date("2025-11-03T10:15:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799430003"),
name: "Intel Core i5-14600K",
price: 349.99,
rating: 4.5,
reviews: [],
imageUrl: "./images/Intel-Core-i5-14600K.jpg",
category: "CPU",
stock: 48,
createdAt: new Date("2025-11-08T09:30:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799430004"),
name: "AMD Ryzen 7 7800X3D",
price: 429.99,
rating: 4.8,
reviews: [],
imageUrl: "./images/AMD-Ryzen-7-7800X3D.jpg",
category: "CPU",
stock: 28,
createdAt: new Date("2025-11-12T14:50:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799430005"),
name: "Intel Core i3-14100",
price: 169.99,
rating: 4.2,
reviews: [],
imageUrl: "./images/Intel-Core-i3-14100.jpg",
category: "CPU",
stock: 60,
createdAt: new Date("2025-11-18T07:45:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799440001"),
name: "Corsair Vengeance 32GB 2x16GB DDR5 6000MHz C36",
price: 134.99,
rating: 4.6,
reviews: [],
imageUrl: "./images/Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz C36.jpeg",
category: "Memory",
stock: 52,
createdAt: new Date("2025-11-05T08:00:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799440002"),
name: "G.Skill Trident Z5 RGB 32GB 2x16GB DDR5 6800MHz CL34",
price: 189.99,
rating: 4.7,
reviews: [],
imageUrl: "./images/G.Skill-Trident-Z5-RGB-32GB-2x16GB-DDR5-6800MHz-CL34.jpg",
category: "Memory",
stock: 30,
createdAt: new Date("2025-11-10T10:20:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799440003"),
name: "Kingston FURY Beast 32GB 2x16GB DDR5 5600MHz",
price: 119.99,
rating: 4.4,
reviews: [],
imageUrl: "./images/Kingston-FURY-Beast-32GB-2x16GB-DDR5-5600MHz.jpg",
category: "Memory",
stock: 64,
createdAt: new Date("2025-11-15T09:45:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799440004"),
name: "Crucial Pro 32GB 2x16GB DDR5 6000MHz",
price: 124.99,
rating: 4.5,
reviews: [],
imageUrl: "./images/Crucial-Pro-32GB-2x16GB-DDR5-6000MHz.jpg",
category: "Memory",
stock: 41,
createdAt: new Date("2025-11-18T14:10:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799440005"),
name: "Corsair Vengeance 64GB 2x32GB DDR5 5200MHz",
price: 219.99,
rating: 4.3,
reviews: [],
imageUrl: "./images/Corsair-Vengeance-64GB-2x32GB-DDR5-5200MHz.jpg",
category: "Memory",
stock: 27,
createdAt: new Date("2025-11-22T07:55:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799450001"),
name: "ASUS ROG Strix Z790-F Gaming WiFi II",
price: 399.99,
rating: 4.7,
reviews: [],
imageUrl: "./images/ASUS-ROG-Strix-Z790-F-Gaming-WiFi-II.jpg",
category: "Motherboard",
stock: 18,
createdAt: new Date("2025-11-06T08:00:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799450002"),
name: "MSI MAG B650 Tomahawk WiFi",
price: 229.99,
rating: 4.5,
reviews: [],
imageUrl: "./images/MSI MAG B650 Tomahawk WiFi.jpeg",
category: "Motherboard",
stock: 26,
createdAt: new Date("2025-11-09T10:10:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799450003"),
name: "Gigabyte Z790 AORUS Elite AX",
price: 289.99,
rating: 4.4,
reviews: [],
imageUrl: "./images/Gigabyte Z790 AORUS Elite AX.png",
category: "Motherboard",
stock: 34,
createdAt: new Date("2025-11-14T09:35:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799450004"),
name: "ASUS TUF Gaming B650-PLUS WiFi",
price: 209.99,
rating: 4.3,
reviews: [],
imageUrl: "./images/ASUS-TUF-Gaming-B650-PLUS-WiFi.jpg",
category: "Motherboard",
stock: 29,
createdAt: new Date("2025-11-18T14:20:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799450005"),
name: "ASRock B760M Pro RS",
price: 139.99,
rating: 4.2,
reviews: [],
imageUrl: "./images/ASRock-B760M-Pro-RS.jpg",
category: "Motherboard",
stock: 47,
createdAt: new Date("2025-11-22T07:55:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799460001"),
name: "Corsair RM850x 850W 80+ Gold Fully Modular",
price: 149.99,
rating: 4.8,
reviews: [],
imageUrl: "./images/Corsair-RM850x-850W-80-Gold-Fully-Modular.jpg",
category: "Power Supply",
stock: 32,
createdAt: new Date("2025-11-05T08:00:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799460002"),
name: "Seasonic Focus GX-750 750W 80+ Gold Fully Modular",
price: 129.99,
rating: 4.7,
reviews: [],
imageUrl: "./images/Seasonic-Focus-GX-750-750W-80-Gold-Fully-Modular.jpg",
category: "Power Supply",
stock: 27,
createdAt: new Date("2025-11-08T10:25:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799460003"),
name: "EVGA SuperNOVA 1000 G6 1000W 80+ Gold Fully Modular",
price: 199.99,
rating: 4.6,
reviews: [],
imageUrl: "./images/EVGA SuperNOVA 1000 G6 1000W 80+ Gold Fully Modular.jpeg",
category: "Power Supply",
stock: 19,
createdAt: new Date("2025-11-14T09:40:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799460004"),
name: "be quiet! Pure Power 12 M 650W 80+ Gold Modular",
price: 109.99,
rating: 4.5,
reviews: [],
imageUrl: "./images/be-quiet-Pure-Power-12-M-650W-80-Gold-Modular.jpg",
category: "Power Supply",
stock: 38,
createdAt: new Date("2025-11-19T14:15:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799460005"),
name: "Corsair CX550M 550W 80+ Bronze Semi-Modular",
price: 69.99,
rating: 4.3,
reviews: [],
imageUrl: "./images/Corsair-CX550M-550W-80-Bronze-Semi-Modular.jpg",
category: "Power Supply",
stock: 54,
createdAt: new Date("2025-11-23T07:55:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799470001"),
name: "NZXT H7 Flow Mid-Tower ATX Case",
price: 149.99,
rating: 4.7,
reviews: [],
imageUrl: "./images/NZXT-H7-Flow-Mid-Tower-ATX-Case.jpg",
category: "Case",
stock: 24,
createdAt: new Date("2025-11-06T08:00:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799470002"),
name: "Fractal Design Meshify 2 Compact",
price: 129.99,
rating: 4.6,
reviews: [],
imageUrl: "./images/Fractal-Design-Meshify-2-Compact.jpg",
category: "Case",
stock: 31,
createdAt: new Date("2025-11-10T10:20:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799470003"),
name: "Lian Li LANCOOL III RGB",
price: 179.99,
rating: 4.8,
reviews: [],
imageUrl: "./images/Lian Li LANCOOL III RGB.jpeg",
category: "Case",
stock: 19,
createdAt: new Date("2025-11-14T09:40:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799470004"),
name: "Corsair 4000D Airflow Mid-Tower",
price: 109.99,
rating: 4.5,
reviews: [],
imageUrl: "./images/Corsair-4000D-Airflow-Mid-Tower.jpg",
category: "Case",
stock: 43,
createdAt: new Date("2025-11-18T14:15:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799470005"),
name: "Phanteks Eclipse G360A",
price: 99.99,
rating: 4.4,
reviews: [],
imageUrl: "./images/Phanteks-Eclipse-G360A.jpg",
category: "Case",
stock: 37,
createdAt: new Date("2025-11-22T07:55:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799490001"),
name: "Noctua NH-D15 chromax.black",
price: 119.99,
rating: 4.9,
reviews: [],
imageUrl: "./images/Noctua NH-D15 chromax.black.jpeg",
category: "CPU Cooler",
stock: 28,
createdAt: new Date("2025-11-08T08:00:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799490002"),
name: "NZXT Kraken Elite 360 RGB AIO",
price: 279.99,
rating: 4.7,
reviews: [],
imageUrl: "./images/NZXT-Kraken-Elite-360-RGB-AIO.jpg",
category: "CPU Cooler",
stock: 16,
createdAt: new Date("2025-11-12T10:30:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799490003"),
name: "be quiet! Dark Rock Pro 5",
price: 99.99,
rating: 4.6,
reviews: [],
imageUrl: "./images/be-quiet-Dark-Rock-Pro-5.jpg",
category: "CPU Cooler",
stock: 35,
createdAt: new Date("2025-11-17T09:20:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799490004"),
name: "Corsair iCUE H150i Elite LCD XT",
price: 249.99,
rating: 4.5,
reviews: [],
imageUrl: "./images/Corsair iCUE H150i Elite LCD XT.jpeg",
category: "CPU Cooler",
stock: 22,
createdAt: new Date("2025-11-21T14:10:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799490005"),
name: "Thermalright Peerless Assassin 120 SE",
price: 39.99,
rating: 4.8,
reviews: [],
imageUrl: "./images/Thermalright-Peerless-Assassin-120-SE.jpg",
category: "CPU Cooler",
stock: 49,
createdAt: new Date("2025-11-25T07:45:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799480001"),
name: "Samsung 990 PRO 2TB PCIe 4.0 NVMe SSD",
price: 179.99,
rating: 4.8,
reviews: [],
imageUrl: "./images/Samsung-990-PRO-2TB-PCIe-4.0-NVMe-SSD.jpg",
category: "Storage",
stock: 41,
createdAt: new Date("2025-11-07T08:00:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799480002"),
name: "WD Black SN850X 1TB PCIe 4.0 NVMe SSD",
price: 99.99,
rating: 4.7,
reviews: [],
imageUrl: "./images/WD-Black-SN850X-1TB-PCIe-4.0-NVMe-SSD.jpg",
category: "Storage",
stock: 58,
createdAt: new Date("2025-11-11T10:30:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799480003"),
name: "Seagate Barracuda 4TB 7200RPM SATA HDD",
price: 89.99,
rating: 4.4,
reviews: [],
imageUrl: "./images/Seagate-Barracuda-4TB-7200RPM-SATA-HDD.jpg",
category: "Storage",
stock: 67,
createdAt: new Date("2025-11-16T09:25:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799480004"),
name: "Crucial T500 4TB PCIe 5.0 NVMe SSD",
price: 399.99,
rating: 4.6,
reviews: [],
imageUrl: "./images/Crucial-T500-4TB-PCIe-5.0-NVMe-SSD.jpg",
category: "Storage",
stock: 15,
createdAt: new Date("2025-11-20T14:00:00Z")
},

{
_id: ObjectId("665f1f77bcf86cd799480005"),
name: "Samsung 870 EVO 2TB SATA SSD",
price: 149.99,
rating: 4.5,
reviews: [],
imageUrl: "./images/Samsung-870-EVO-2TB-SATA-SSD.jpg",
category: "Storage",
stock: 33,
createdAt: new Date("2025-11-24T07:50:00Z")
}

]);
