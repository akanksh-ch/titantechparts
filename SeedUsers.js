db = db.getSiblingDB('titantechparts');

db.User.insertMany([

{

_id: ObjectId("665f1f77bcf86cd799600001"),

email: "alex.johnson@example.com",

passwordHash: "a3f5c1e9b7d4f2a8c6e1b9d3f7a2c5e1",

username: "alexj",

roles: ["user"],

isActive: true,

wishlist: [],

createdAt: new Date("2025-11-01T09:00:00Z"),

updatedAt: new Date("2026-01-10T15:00:00Z")

},

{

_id: ObjectId("665f1f77bcf86cd799600002"),

email: "priya.patel@example.com",

passwordHash: "b4e6d2c8a1f9e3b7c5d1a9f3e7b2c6d",

username: "priyap",

roles: ["user"],

isActive: true,

wishlist: [],

createdAt: new Date("2025-11-05T10:15:00Z"),

updatedAt: new Date("2026-01-05T11:40:00Z")

},

{

_id: ObjectId("665f1f77bcf86cd799600003"),

email: "daniel.green@example.com",

passwordHash: "c5d7e3a9b2f8c4e6a1d9f3b7e2c6a8d",

username: "danielg",

roles: ["user", "admin"],

isActive: true,

wishlist: [],

createdAt: new Date("2025-11-10T08:30:00Z"),

updatedAt: new Date("2026-01-15T09:15:00Z")

},

{

_id: ObjectId("665f1f77bcf86cd799600004"),

email: "lucy.thompson@example.com",

passwordHash: "d6e8f4b1c3a9e5d7b2c8f1a3e7d9b5c",

username: "lucyt",

roles: ["user"],

isActive: false,

wishlist: [],

createdAt: new Date("2025-11-12T12:00:00Z"),

updatedAt: new Date("2026-01-08T10:05:00Z")

},

{

_id: ObjectId("665f1f77bcf86cd799600005"),

email: "hannah.schmidt@example.com",

passwordHash: "e7f9a5c2d4b8e6f1c3a7d2b9f4e1c6a",

username: "hannahs",

roles: ["user"],

isActive: true,

wishlist: [],

createdAt: new Date("2025-11-15T14:20:00Z"),

updatedAt: new Date("2026-01-06T09:55:00Z")

}

]);
