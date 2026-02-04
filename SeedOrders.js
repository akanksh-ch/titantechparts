db = db.getSiblingDB('titantechparts');

db.Orders.insertMany([
  {
    _id: ObjectId("665f1f77bcf86cd799500001"),
    userId: ObjectId("665f1f77bcf86cd799600001"),
    items: [
      {
        inventoryId: ObjectId("665f1f77bcf86cd799439001"),
        quantity: 1,
        unitPrice: 209.99,
        lineTotal: 209.99
      },
      {
        inventoryId: ObjectId("665f1f77bcf86cd799480001"),
        quantity: 1,
        unitPrice: 179.99,
        lineTotal: 179.99
      }
    ],
    amount: 389.98,
    currency: "GBP",
    status: "paid",
    createdAt: new Date("2026-01-10T15:10:00Z"),
    updatedAt: new Date("2026-01-10T15:12:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799500002"),
    userId: ObjectId("665f1f77bcf86cd799600002"),
    items: [
      {
        inventoryId: ObjectId("665f1f77bcf86cd799430001"),
        quantity: 1,
        unitPrice: 649.99,
        lineTotal: 649.99
      },
      {
        inventoryId: ObjectId("665f1f77bcf86cd799440001"),
        quantity: 2,
        unitPrice: 134.99,
        lineTotal: 269.98
      }
    ],
    amount: 919.97,
    currency: "GBP",
    status: "paid",
    createdAt: new Date("2026-01-05T11:45:00Z"),
    updatedAt: new Date("2026-01-05T11:50:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799500003"),
    userId: ObjectId("665f1f77bcf86cd799600003"),
    items: [
      {
        inventoryId: ObjectId("665f1f77bcf86cd799439003"),
        quantity: 1,
        unitPrice: 749.99,
        lineTotal: 749.99
      },
      {
        inventoryId: ObjectId("665f1f77bcf86cd799450001"),
        quantity: 1,
        unitPrice: 399.99,
        lineTotal: 399.99
      },
      {
        inventoryId: ObjectId("665f1f77bcf86cd799440002"),
        quantity: 1,
        unitPrice: 189.99,
        lineTotal: 189.99
      }
    ],
    amount: 1339.97,
    currency: "GBP",
    status: "pending",
    createdAt: new Date("2026-01-15T09:20:00Z"),
    updatedAt: new Date("2026-01-15T09:20:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799500004"),
    userId: ObjectId("665f1f77bcf86cd799600001"),
    items: [
      {
        inventoryId: ObjectId("665f1f77bcf86cd799430004"),
        quantity: 1,
        unitPrice: 429.99,
        lineTotal: 429.99
      },
      {
        inventoryId: ObjectId("665f1f77bcf86cd799480003"),
        quantity: 2,
        unitPrice: 89.99,
        lineTotal: 179.98
      }
    ],
    amount: 609.97,
    currency: "GBP",
    status: "paid",
    createdAt: new Date("2025-12-30T19:05:00Z"),
    updatedAt: new Date("2025-12-30T19:07:00Z")
  },
  {
    _id: ObjectId("665f1f77bcf86cd799500005"),
    userId: ObjectId("665f1f77bcf86cd799600004"),
    items: [
      {
        inventoryId: ObjectId("665f1f77bcf86cd799439005"),
        quantity: 1,
        unitPrice: 599.99,
        lineTotal: 599.99
      },
      {
        inventoryId: ObjectId("665f1f77bcf86cd799460001"),
        quantity: 1,
        unitPrice: 149.99,
        lineTotal: 149.99
      },
      {
        inventoryId: ObjectId("665f1f77bcf86cd799470004"),
        quantity: 1,
        unitPrice: 109.99,
        lineTotal: 109.99
      }
    ],
    amount: 859.97,
    currency: "GBP",
    status: "refunded",
    createdAt: new Date("2026-01-02T13:30:00Z"),
    updatedAt: new Date("2026-01-08T10:10:00Z")
  }
]);
