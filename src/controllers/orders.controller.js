import { db } from "../database/database.js";

async function postOrder (req, res) {

    console.log('eu vou postar');

    return res.sendStatus(200);
}

async function getOrder (req, res) {

    console.log('eu vou pegar');

    return res.sendStatus(200);
}

export { postOrder, getOrder };