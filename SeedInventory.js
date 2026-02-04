db = db.getSiblingDB('titantechparts');

db.Inventory.insertMany([
  {
    _id: ObjectId("665f1f77bcf86cd799439001"),
    name: "NVIDIA GeForce RTX 4090 24GB GDDR6X",
    price: 2099.99,
    rating: 4.8,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799439101"),
        reviewer: "Alex Johnson",
        text: "Absolutely insane performance at 4K. Runs everything maxed out, but make sure you have a big case and a quality PSU.",
        rating: 5,
        date: new Date("2026-01-10T14:25:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799439102"),
        reviewer: "Maria Lopez",
        text: "Great for gaming and AI workloads, but the power draw and price are both very high.",
        rating: 4,
        date: new Date("2025-12-02T09:10:00Z")
      }
    ],
    imageUrl: "",
    category: "GPU",
    stock: 12,
    createdAt: new Date("2025-11-01T08:00:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799439002"),
    name: "AMD Radeon RX 7900 XTX 24GB GDDR6",
    price: 1399.99,
    rating: 4.6,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799439103"),
        reviewer: "Daniel Green",
        text: "Fantastic raster performance and VRAM capacity. Runs a bit warmer than I expected but still within reason.",
        rating: 5,
        date: new Date("2025-12-15T18:40:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799439104"),
        reviewer: "Sophie Martin",
        text: "Great value compared to the top-end NVIDIA cards, though ray tracing still lags a little behind.",
        rating: 4,
        date: new Date("2026-01-05T11:05:00Z")
      }
    ],
    imageUrl: "",
    category: "GPU",
    stock: 25,
    createdAt: new Date("2025-11-05T10:15:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799439003"),
    name: "NVIDIA GeForce RTX 4070 SUPER 12GB GDDR6X",
    price: 749.99,
    rating: 4.4,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799439105"),
        reviewer: "Chris Walker",
        text: "Excellent 1440p card, quiet and efficient. DLSS makes modern titles run incredibly smoothly.",
        rating: 5,
        date: new Date("2025-12-20T16:00:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799439106"),
        reviewer: "Emily Carter",
        text: "Good performance but the price could be a bit lower given the competition.",
        rating: 4,
        date: new Date("2026-01-02T13:20:00Z")
      }
    ],
    imageUrl: "",
    category: "GPU",
    stock: 40,
    createdAt: new Date("2025-11-10T09:30:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799439004"),
    name: "NVIDIA GeForce RTX 4060 Ti 8GB GDDR6",
    price: 449.99,
    rating: 4.1,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799439107"),
        reviewer: "James Wilson",
        text: "Solid 1080p and decent 1440p card. Very power efficient and fits easily in smaller cases.",
        rating: 4,
        date: new Date("2025-11-25T12:10:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799439108"),
        reviewer: "Hannah Schmidt",
        text: "Does the job for esports and lighter AAA titles, but 8GB VRAM can be limiting in some newer games.",
        rating: 4,
        date: new Date("2025-12-30T17:45:00Z")
      }
    ],
    imageUrl: "",
    category: "GPU",
    stock: 60,
    createdAt: new Date("2025-11-12T14:50:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799439005"),
    name: "AMD Radeon RX 7800 XT 16GB GDDR6",
    price: 599.99,
    rating: 4.3,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799439109"),
        reviewer: "Oliver Brown",
        text: "Great 1440p performance and plenty of VRAM. Good alternative to midrange NVIDIA cards.",
        rating: 5,
        date: new Date("2025-11-28T19:30:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799439110"),
        reviewer: "Lucy Thompson",
        text: "Very happy overall, but the software suite took a bit of time to get used to.",
        rating: 4,
        date: new Date("2026-01-08T08:55:00Z")
      }
    ],
    imageUrl: "",
    category: "GPU",
    stock: 33,
    createdAt: new Date("2025-11-18T07:45:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799430001"),
    name: "Intel Core i9-14900K",
    price: 649.99,
    rating: 4.7,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799431001"),
        reviewer: "Alex Johnson",
        text: "Monster CPU for high-refresh gaming and heavy workloads. Runs hot under all-core loads so invest in a good AIO.",
        rating: 5,
        date: new Date("2025-12-15T10:30:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799431002"),
        reviewer: "Priya Patel",
        text: "Upgraded from a 12700K; the performance jump is noticeable in Blender and compile times.",
        rating: 4,
        date: new Date("2026-01-04T09:45:00Z")
      }
    ],
    imageUrl: "",
    category: "CPU",
    stock: 35,
    createdAt: new Date("2025-11-01T08:00:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799430002"),
    name: "AMD Ryzen 9 7950X",
    price: 579.99,
    rating: 4.6,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799431003"),
        reviewer: "Daniel Green",
        text: "Fantastic multi-core performance for rendering and virtual machines. AM5 platform feels very future-proof.",
        rating: 5,
        date: new Date("2025-12-10T14:20:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799431004"),
        reviewer: "Sophie Martin",
        text: "Great CPU, but you definitely need decent DDR5 and a good cooler to get the most out of it.",
        rating: 4,
        date: new Date("2025-12-28T19:05:00Z")
      }
    ],
    imageUrl: "",
    category: "CPU",
    stock: 22,
    createdAt: new Date("2025-11-03T10:15:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799430003"),
    name: "Intel Core i5-14600K",
    price: 349.99,
    rating: 4.5,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799431005"),
        reviewer: "Chris Walker",
        text: "Sweet spot for 1440p gaming. Plenty of cores for streaming and background tasks without breaking the bank.",
        rating: 5,
        date: new Date("2025-11-22T16:00:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799431006"),
        reviewer: "Emily Carter",
        text: "Runs a bit warm on the stock settings but performance is excellent after a small undervolt.",
        rating: 4,
        date: new Date("2025-12-30T13:20:00Z")
      }
    ],
    imageUrl: "",
    category: "CPU",
    stock: 48,
    createdAt: new Date("2025-11-08T09:30:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799430004"),
    name: "AMD Ryzen 7 7800X3D",
    price: 429.99,
    rating: 4.8,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799431007"),
        reviewer: "James Wilson",
        text: "Incredible gaming performance thanks to the 3D cache. Paired with a midrange GPU and it absolutely flies at 1440p.",
        rating: 5,
        date: new Date("2025-11-26T12:10:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799431008"),
        reviewer: "Hannah Schmidt",
        text: "Not the fastest in heavy productivity, but for pure gaming it's one of the best options right now.",
        rating: 4,
        date: new Date("2026-01-01T17:45:00Z")
      }
    ],
    imageUrl: "",
    category: "CPU",
    stock: 28,
    createdAt: new Date("2025-11-12T14:50:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799430005"),
    name: "Intel Core i3-14100",
    price: 169.99,
    rating: 4.2,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799431009"),
        reviewer: "Oliver Brown",
        text: "Great budget chip for office work and light gaming paired with a midrange GPU.",
        rating: 4,
        date: new Date("2025-11-30T19:30:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799431010"),
        reviewer: "Lucy Thompson",
        text: "Perfect for a simple home PC build. Very low power draw and stays cool with a basic air cooler.",
        rating: 4,
        date: new Date("2026-01-06T08:55:00Z")
      }
    ],
    imageUrl: "",
    category: "CPU",
    stock: 60,
    createdAt: new Date("2025-11-18T07:45:00Z")
  },

  // MEMORY (RAM -> Memory)
  {
    _id: ObjectId("665f1f77bcf86cd799440001"),
    name: "Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz C36",
    price: 134.99,
    rating: 4.6,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799441001"),
        reviewer: "Alex Johnson",
        text: "Easy XMP setup and rock-solid at 6000MHz. Fits under a large air cooler with no clearance issues.",
        rating: 5,
        date: new Date("2025-12-12T15:10:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799441002"),
        reviewer: "Priya Patel",
        text: "Great performance for gaming and productivity, though CL36 isn't the tightest timing out there.",
        rating: 4,
        date: new Date("2026-01-03T09:40:00Z")
      }
    ],
    imageUrl: "",
    category: "Memory",
    stock: 52,
    createdAt: new Date("2025-11-05T08:00:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799440002"),
    name: "G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5 6800MHz CL34",
    price: 189.99,
    rating: 4.7,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799441003"),
        reviewer: "Daniel Green",
        text: "Looks amazing in a glass case and runs perfectly at its XMP profile. Great pairing with a high-end Intel CPU.",
        rating: 5,
        date: new Date("2025-12-20T18:30:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799441004"),
        reviewer: "Sophie Martin",
        text: "Premium price but the combination of speed, timings and RGB is hard to beat.",
        rating: 4,
        date: new Date("2026-01-07T11:15:00Z")
      }
    ],
    imageUrl: "",
    category: "Memory",
    stock: 30,
    createdAt: new Date("2025-11-10T10:20:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799440003"),
    name: "Kingston FURY Beast 32GB (2x16GB) DDR5 5600MHz",
    price: 119.99,
    rating: 4.4,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799441005"),
        reviewer: "Chris Walker",
        text: "Good balance of speed and price. Dropped straight into an AM5 build and worked with EXPO first try.",
        rating: 5,
        date: new Date("2025-11-28T13:00:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799441006"),
        reviewer: "Emily Carter",
        text: "Not the fastest kit, but perfectly fine for a midrange gaming PC.",
        rating: 4,
        date: new Date("2025-12-31T16:45:00Z")
      }
    ],
    imageUrl: "",
    category: "Memory",
    stock: 64,
    createdAt: new Date("2025-11-15T09:45:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799440004"),
    name: "Crucial Pro 32GB (2x16GB) DDR5 6000MHz",
    price: 124.99,
    rating: 4.5,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799441007"),
        reviewer: "James Wilson",
        text: "No-frills black sticks that just work. Great choice for a clean, non-RGB workstation build.",
        rating: 5,
        date: new Date("2025-12-05T12:25:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799441008"),
        reviewer: "Hannah Schmidt",
        text: "Runs at rated speed without tinkering, but the heatsink design is very basic.",
        rating: 4,
        date: new Date("2026-01-02T17:20:00Z")
      }
    ],
    imageUrl: "",
    category: "Memory",
    stock: 41,
    createdAt: new Date("2025-11-18T14:10:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799440005"),
    name: "Corsair Vengeance 64GB (2x32GB) DDR5 5200MHz",
    price: 219.99,
    rating: 4.3,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799441009"),
        reviewer: "Oliver Brown",
        text: "Perfect for heavy multitasking and creative workloads. My Premiere projects feel much smoother now.",
        rating: 5,
        date: new Date("2025-12-22T19:35:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799441010"),
        reviewer: "Lucy Thompson",
        text: "Overkill for pure gaming, but ideal if you like having a ton of browser tabs and VMs open.",
        rating: 4,
        date: new Date("2026-01-06T08:50:00Z")
      }
    ],
    imageUrl: "",
    category: "Memory",
    stock: 27,
    createdAt: new Date("2025-11-22T07:55:00Z")
  },

  // Motherboards
  {
    _id: ObjectId("665f1f77bcf86cd799450001"),
    name: "ASUS ROG Strix Z790-F Gaming WiFi II",
    price: 399.99,
    rating: 4.7,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799451001"),
        reviewer: "Alex Johnson",
        text: "Great board for a high-end Intel build. Plenty of M.2 slots, solid VRMs and the BIOS is easy to work with.",
        rating: 5,
        date: new Date("2025-12-18T13:20:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799451002"),
        reviewer: "Priya Patel",
        text: "On the pricey side, but the connectivity and build quality justify it for a premium gaming rig.",
        rating: 4,
        date: new Date("2026-01-03T09:55:00Z")
      }
    ],
    imageUrl: "",
    category: "Motherboard",
    stock: 18,
    createdAt: new Date("2025-11-06T08:00:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799450002"),
    name: "MSI MAG B650 Tomahawk WiFi",
    price: 229.99,
    rating: 4.5,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799451003"),
        reviewer: "Daniel Green",
        text: "Excellent midrange AM5 board with strong VRMs and good layout. Perfect pairing with a Ryzen 7 chip.",
        rating: 5,
        date: new Date("2025-12-10T17:05:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799451004"),
        reviewer: "Sophie Martin",
        text: "No onboard RGB and the audio is just okay, but overall great value for a modern build.",
        rating: 4,
        date: new Date("2025-12-29T11:30:00Z")
      }
    ],
    imageUrl: "",
    category: "Motherboard",
    stock: 26,
    createdAt: new Date("2025-11-09T10:10:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799450003"),
    name: "Gigabyte Z790 AORUS Elite AX",
    price: 289.99,
    rating: 4.4,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799451005"),
        reviewer: "Chris Walker",
        text: "Solid Intel board with good power delivery and lots of USB ports. BIOS took a firmware update to feel polished.",
        rating: 4,
        date: new Date("2025-11-24T15:40:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799451006"),
        reviewer: "Emily Carter",
        text: "Great feature set for the money and enough headers for a fully RGB'd case.",
        rating: 5,
        date: new Date("2026-01-01T12:05:00Z")
      }
    ],
    imageUrl: "",
    category: "Motherboard",
    stock: 34,
    createdAt: new Date("2025-11-14T09:35:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799450004"),
    name: "ASUS TUF Gaming B650-PLUS WiFi",
    price: 209.99,
    rating: 4.3,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799451007"),
        reviewer: "James Wilson",
        text: "Very sturdy board with good thermals and a clean layout. Ideal for a long-lasting Ryzen gaming build.",
        rating: 5,
        date: new Date("2025-12-03T12:15:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799451008"),
        reviewer: "Hannah Schmidt",
        text: "Lacks some of the fancy features of pricier boards, but everything important is there.",
        rating: 4,
        date: new Date("2025-12-30T18:25:00Z")
      }
    ],
    imageUrl: "",
    category: "Motherboard",
    stock: 29,
    createdAt: new Date("2025-11-18T14:20:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799450005"),
    name: "ASRock B760M Pro RS",
    price: 139.99,
    rating: 4.2,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799451009"),
        reviewer: "Oliver Brown",
        text: "Great budget Micro-ATX board for 14th gen Intel. Enough features for a simple gaming or office PC.",
        rating: 4,
        date: new Date("2025-11-27T19:10:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799451010"),
        reviewer: "Lucy Thompson",
        text: "Limited PCIe slots but that's expected at this price. Stable and easy to build with.",
        rating: 4,
        date: new Date("2026-01-05T08:40:00Z")
      }
    ],
    imageUrl: "",
    category: "Motherboard",
    stock: 47,
    createdAt: new Date("2025-11-22T07:55:00Z")
  },

  // Power supplies
  {
    _id: ObjectId("665f1f77bcf86cd799460001"),
    name: "Corsair RM850x 850W 80+ Gold Fully Modular",
    price: 149.99,
    rating: 4.8,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799461001"),
        reviewer: "Alex Johnson",
        text: "Very quiet and fully modular, made cable management in my mid-tower build much easier.",
        rating: 5,
        date: new Date("2025-12-16T12:20:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799461002"),
        reviewer: "Priya Patel",
        text: "Plenty of headroom for a high-end GPU and overclocked CPU. Zero issues so far.",
        rating: 5,
        date: new Date("2026-01-04T09:30:00Z")
      }
    ],
    imageUrl: "",
    category: "Power Supply",
    stock: 32,
    createdAt: new Date("2025-11-05T08:00:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799460002"),
    name: "Seasonic Focus GX-750 750W 80+ Gold Fully Modular",
    price: 129.99,
    rating: 4.7,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799461003"),
        reviewer: "Daniel Green",
        text: "Rock-solid voltages and compact size. Great choice for a powerful yet efficient gaming rig.",
        rating: 5,
        date: new Date("2025-12-09T17:10:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799461004"),
        reviewer: "Sophie Martin",
        text: "Cables are a bit stiff but once routed it's flawless.",
        rating: 4,
        date: new Date("2025-12-27T11:45:00Z")
      }
    ],
    imageUrl: "",
    category: "Power Supply",
    stock: 27,
    createdAt: new Date("2025-11-08T10:25:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799460003"),
    name: "EVGA SuperNOVA 1000 G6 1000W 80+ Gold Fully Modular",
    price: 199.99,
    rating: 4.6,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799461005"),
        reviewer: "Chris Walker",
        text: "Overkill for my system, but nice to have the margin for future GPU upgrades.",
        rating: 5,
        date: new Date("2025-11-25T15:50:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799461006"),
        reviewer: "Emily Carter",
        text: "Runs cool and quiet, though the unit is quite long, so check your case clearance.",
        rating: 4,
        date: new Date("2026-01-02T12:05:00Z")
      }
    ],
    imageUrl: "",
    category: "Power Supply",
    stock: 19,
    createdAt: new Date("2025-11-14T09:40:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799460004"),
    name: "be quiet! Pure Power 12 M 650W 80+ Gold Modular",
    price: 109.99,
    rating: 4.5,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799461007"),
        reviewer: "James Wilson",
        text: "Lives up to the name; the fan is barely audible and it's perfect for a midrange build.",
        rating: 5,
        date: new Date("2025-12-04T12:30:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799461008"),
        reviewer: "Hannah Schmidt",
        text: "Semi-modular design is fine, but fully modular would have been nicer.",
        rating: 4,
        date: new Date("2025-12-31T18:15:00Z")
      }
    ],
    imageUrl: "",
    category: "Power Supply",
    stock: 38,
    createdAt: new Date("2025-11-19T14:15:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799460005"),
    name: "Corsair CX550M 550W 80+ Bronze Semi-Modular",
    price: 69.99,
    rating: 4.3,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799461009"),
        reviewer: "Oliver Brown",
        text: "Solid budget unit for an entry-level gaming PC. No issues under load with a midrange GPU.",
        rating: 4,
        date: new Date("2025-11-29T19:20:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799461010"),
        reviewer: "Lucy Thompson",
        text: "Good value and reasonably quiet, though cable selection is a bit limited.",
        rating: 4,
        date: new Date("2026-01-06T08:45:00Z")
      }
    ],
    imageUrl: "",
    category: "Power Supply",
    stock: 54,
    createdAt: new Date("2025-11-23T07:55:00Z")
  },

  // Cases
  {
    _id: ObjectId("665f1f77bcf86cd799470001"),
    name: "NZXT H7 Flow Mid-Tower ATX Case",
    price: 149.99,
    rating: 4.7,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799471001"),
        reviewer: "Alex Johnson",
        text: "Airflow is excellent and the build quality feels premium. Cable management channels make the back side very tidy.",
        rating: 5,
        date: new Date("2025-12-14T12:10:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799471002"),
        reviewer: "Priya Patel",
        text: "Front mesh panel keeps temps low, but the case is a bit taller than I expected.",
        rating: 4,
        date: new Date("2026-01-03T09:50:00Z")
      }
    ],
    imageUrl: "",
    category: "Case",
    stock: 24,
    createdAt: new Date("2025-11-06T08:00:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799470002"),
    name: "Fractal Design Meshify 2 Compact",
    price: 129.99,
    rating: 4.6,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799471003"),
        reviewer: "Daniel Green",
        text: "Compact footprint with great airflow. Easy to build in and supports plenty of storage.",
        rating: 5,
        date: new Date("2025-12-11T17:00:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799471004"),
        reviewer: "Sophie Martin",
        text: "Side panel mechanism is super convenient, but front I/O could use an extra USB port.",
        rating: 4,
        date: new Date("2025-12-28T11:25:00Z")
      }
    ],
    imageUrl: "",
    category: "Case",
    stock: 31,
    createdAt: new Date("2025-11-10T10:20:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799470003"),
    name: "Lian Li LANCOOL III RGB",
    price: 179.99,
    rating: 4.8,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799471005"),
        reviewer: "Chris Walker",
        text: "Tons of room for radiators and storage, plus hinged panels make access a breeze.",
        rating: 5,
        date: new Date("2025-11-25T15:35:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799471006"),
        reviewer: "Emily Carter",
        text: "ARGB fans look great out of the box, though it's a large case so plan your desk space.",
        rating: 4,
        date: new Date("2026-01-02T12:00:00Z")
      }
    ],
    imageUrl: "",
    category: "Case",
    stock: 19,
    createdAt: new Date("2025-11-14T09:40:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799470004"),
    name: "Corsair 4000D Airflow Mid-Tower",
    price: 109.99,
    rating: 4.5,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799471007"),
        reviewer: "James Wilson",
        text: "Great value case with good airflow and a clean aesthetic. Easy cable routing with the rear channel.",
        rating: 5,
        date: new Date("2025-12-03T12:20:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799471008"),
        reviewer: "Hannah Schmidt",
        text: "Only comes with two fans, so budget for extra if you want a fully populated front panel.",
        rating: 4,
        date: new Date("2025-12-31T18:10:00Z")
      }
    ],
    imageUrl: "",
    category: "Case",
    stock: 43,
    createdAt: new Date("2025-11-18T14:15:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799470005"),
    name: "Phanteks Eclipse G360A",
    price: 99.99,
    rating: 4.4,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799471009"),
        reviewer: "Oliver Brown",
        text: "Includes three RGB fans and has fantastic airflow for the price. Building inside was straightforward.",
        rating: 5,
        date: new Date("2025-11-29T19:15:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799471010"),
        reviewer: "Lucy Thompson",
        text: "Front panel lighting looks great, but the PSU shroud is a bit cramped for longer power supplies.",
        rating: 4,
        date: new Date("2026-01-06T08:40:00Z")
      }
    ],
    imageUrl: "",
    category: "Case",
    stock: 37,
    createdAt: new Date("2025-11-22T07:55:00Z")
  },

  // CPU coolers
  {
    _id: ObjectId("665f1f77bcf86cd799490001"),
    name: "Noctua NH-D15 chromax.black",
    price: 119.99,
    rating: 4.9,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799491001"),
        reviewer: "Alex Johnson",
        text: "Best air cooler money can buy. Keeps my 14900K under 75°C even with a heavy overclock.",
        rating: 5,
        date: new Date("2025-12-19T13:45:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799491002"),
        reviewer: "Priya Patel",
        text: "Check RAM clearance with tall modules. Performance and build quality are unmatched.",
        rating: 5,
        date: new Date("2026-01-06T10:20:00Z")
      }
    ],
    imageUrl: "",
    category: "CPU Cooler",
    stock: 28,
    createdAt: new Date("2025-11-08T08:00:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799490002"),
    name: "NZXT Kraken Elite 360 RGB AIO",
    price: 279.99,
    rating: 4.7,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799491003"),
        reviewer: "Daniel Green",
        text: "Stunning screen and fantastic cooling for my 7950X. Customizable display adds a premium touch.",
        rating: 5,
        date: new Date("2025-12-13T18:15:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799491004"),
        reviewer: "Sophie Martin",
        text: "Pump noise is minimal but tubing routing takes careful planning.",
        rating: 4,
        date: new Date("2026-01-01T12:10:00Z")
      }
    ],
    imageUrl: "",
    category: "CPU Cooler",
    stock: 16,
    createdAt: new Date("2025-11-12T10:30:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799490003"),
    name: "be quiet! Dark Rock Pro 5",
    price: 99.99,
    rating: 4.6,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799491005"),
        reviewer: "Chris Walker",
        text: "Whisper-quiet operation and handles my 14600K with ease. Sleek all-black design.",
        rating: 5,
        date: new Date("2025-11-28T16:00:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799491006"),
        reviewer: "Emily Carter",
        text: "Great thermal performance but mounting could be simpler.",
        rating: 4,
        date: new Date("2025-12-31T14:25:00Z")
      }
    ],
    imageUrl: "",
    category: "CPU Cooler",
    stock: 35,
    createdAt: new Date("2025-11-17T09:20:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799490004"),
    name: "Corsair iCUE H150i Elite LCD XT",
    price: 249.99,
    rating: 4.5,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799491007"),
        reviewer: "James Wilson",
        text: "Excellent cooling for high-end CPUs and the LCD screens are fun to customize.",
        rating: 5,
        date: new Date("2025-12-07T11:50:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799491008"),
        reviewer: "Hannah Schmidt",
        text: "iCUE software is bloated but cooling performance is top-notch.",
        rating: 4,
        date: new Date("2026-01-03T17:40:00Z")
      }
    ],
    imageUrl: "",
    category: "CPU Cooler",
    stock: 22,
    createdAt: new Date("2025-11-21T14:10:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799490005"),
    name: "Thermalright Peerless Assassin 120 SE",
    price: 39.99,
    rating: 4.8,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799491009"),
        reviewer: "Oliver Brown",
        text: "Insane value - cools my 7800X3D as well as coolers twice the price. Six heatpipes!",
        rating: 5,
        date: new Date("2025-12-02T20:15:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799491010"),
        reviewer: "Lucy Thompson",
        text: "Budget king but fan clips are fiddly to install.",
        rating: 4,
        date: new Date("2026-01-08T09:05:00Z")
      }
    ],
    imageUrl: "",
    category: "CPU Cooler",
    stock: 49,
    createdAt: new Date("2025-11-25T07:45:00Z")
  },

  // Storage
  {
    _id: ObjectId("665f1f77bcf86cd799480001"),
    name: "Samsung 990 PRO 2TB PCIe 4.0 NVMe SSD",
    price: 179.99,
    rating: 4.8,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799481001"),
        reviewer: "Alex Johnson",
        text: "Lightning fast load times in games and apps. Heatsink version keeps temps perfect even under heavy writes.",
        rating: 5,
        date: new Date("2025-12-17T14:30:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799481002"),
        reviewer: "Priya Patel",
        text: "Best bang-for-buck Gen4 drive. Paired it with a 7800X3D and boot times are instant.",
        rating: 5,
        date: new Date("2026-01-05T10:15:00Z")
      }
    ],
    imageUrl: "",
    category: "Storage",
    stock: 41,
    createdAt: new Date("2025-11-07T08:00:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799480002"),
    name: "WD Black SN850X 1TB PCIe 4.0 NVMe SSD",
    price: 99.99,
    rating: 4.7,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799481003"),
        reviewer: "Daniel Green",
        text: "Excellent speeds for the price and reliable software suite. Great OS drive or game library.",
        rating: 5,
        date: new Date("2025-12-12T16:45:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799481004"),
        reviewer: "Sophie Martin",
        text: "Runs warm without a heatsink, but performance is top-tier for a 1TB drive.",
        rating: 4,
        date: new Date("2025-12-30T11:20:00Z")
      }
    ],
    imageUrl: "",
    category: "Storage",
    stock: 58,
    createdAt: new Date("2025-11-11T10:30:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799480003"),
    name: "Seagate Barracuda 4TB 7200RPM SATA HDD",
    price: 89.99,
    rating: 4.4,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799481005"),
        reviewer: "Chris Walker",
        text: "Perfect for mass storage of games, media and backups. Quiet operation and good vibration dampening.",
        rating: 5,
        date: new Date("2025-11-26T15:10:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799481006"),
        reviewer: "Emily Carter",
        text: "Reliable drive but noticeably slower than SSDs for everyday use.",
        rating: 4,
        date: new Date("2026-01-01T13:00:00Z")
      }
    ],
    imageUrl: "",
    category: "Storage",
    stock: 67,
    createdAt: new Date("2025-11-16T09:25:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799480004"),
    name: "Crucial T500 4TB PCIe 5.0 NVMe SSD",
    price: 399.99,
    rating: 4.6,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799481007"),
        reviewer: "James Wilson",
        text: "Future-proof speeds that crush sequential writes. Ideal for video editing and 4K content creation.",
        rating: 5,
        date: new Date("2025-12-08T12:40:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799481008"),
        reviewer: "Hannah Schmidt",
        text: "Premium price but unmatched Gen5 performance. Definitely needs good motherboard cooling.",
        rating: 4,
        date: new Date("2026-01-04T17:35:00Z")
      }
    ],
    imageUrl: "",
    category: "Storage",
    stock: 15,
    createdAt: new Date("2025-11-20T14:00:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799480005"),
    name: "Samsung 870 EVO 2TB SATA SSD",
    price: 149.99,
    rating: 4.5,
    reviews: [
      {
        reviewerId: ObjectId("665f1f77bcf86cd799481009"),
        reviewer: "Oliver Brown",
        text: "Great upgrade from a spinning hard drive. Much faster boot and app loading with rock-solid reliability.",
        rating: 5,
        date: new Date("2025-12-01T19:25:00Z")
      },
      {
        reviewerId: ObjectId("665f1f77bcf86cd799481010"),
        reviewer: "Lucy Thompson",
        text: "Still relevant for systems without NVMe. Excellent endurance rating and 5-year warranty.",
        rating: 4,
        date: new Date("2026-01-07T08:30:00Z")
      }
    ],
    imageUrl: "",
    category: "Storage",
    stock: 33,
    createdAt: new Date("2025-11-24T07:50:00Z")
  }
]);
