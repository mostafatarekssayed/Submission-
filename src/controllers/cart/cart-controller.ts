import db from "../../db/db";

export default function addUserCart(userId: number, productId: number) {
  if (db[userId]?.[productId]) {
    db[userId][productId].quantity++;
    db[userId][productId].updatedAt = new Date();
  } else if (!db[userId]) {
    db[userId] = {
      [productId]: {
        quantity: 1,
        addedAt: new Date(),
        updatedAt: new Date(),
      },
    };
  } else {
    db[userId][productId] = {
      quantity: 1,
      addedAt: new Date(),
      updatedAt: new Date(),
    };
  }

  return db[userId];
}
