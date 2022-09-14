import { db } from "../database/database.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

async function signUp(req, res) {
  try {
    //Find user by email
    const user = await db
      .collection("users")
      .findOne({ email: req.body.email });

    //Check if user exists
    if (user) {
      res.status(409).send({ message: "Usuário já existe." });
      return;
    }

    //Encode password
    const passwordHash = bcrypt.hashSync(req.body.password, 10);

    //Create a new user
    await db.collection("users").insertOne({
      name: req.body.name,
      email: req.body.email,
      password: passwordHash,
    });
    res.status(201).send({ message: "Usuário criado com sucesso." });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

async function signIn(req, res) {
  try {
    //Find user by email
    const user = await db
      .collection("users")
      .findOne({ email: req.body.email });

    //Check if user exists AND password is correct
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      await db
        .collection("users")
        .updateOne(
          { _id: user._id },
          { $set: { lastStatus: Date.now(), token: uuid() } }
        );

      res.status(200).send({
        token: user.token,
        email: user.email,
        name: user.name,
      });
      return;
    } else {
      res.status(409).send({ message: "Dados inválidos." });
      return;
    }
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
}

export { signUp, signIn };
