import { db } from "../database/database.js";

async function getAll(req, res) {
  try {
    const products = await db.collection("products").find().toArray();
    res.status(201).send(products);
    return;
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export { getAll };
