import { db } from "../database/database.js";

async function getAll(req, res) {
  try {
    const products = await db.collection("products").find().toArray();
    res.status(200).send(products);
    return;
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

async function getOne(req, res) {
  try {
    const product = await db
      .collection("products")
      .findOne({ id: parseInt(req.params.id) });
    console.log(product);
    res.status(200).send(product);
    return;
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export { getAll, getOne };
