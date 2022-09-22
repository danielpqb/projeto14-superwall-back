import { db } from "../database/database.js";
import { stripHtml } from "string-strip-html";
import { ObjectId } from "mongodb";

async function postOrder (req, res) {

    const { email, name, address, payment, order, total } = req.body;

    const orderObj = {
        date: new Date(),
        email: stripHtml(email).result,
        name: stripHtml(name).result,
        address: stripHtml(address).result,
        payment: {
            paymentName: stripHtml(payment.paymentName).result,
            creditCardNumber: stripHtml(payment.creditCardNumber).result,
        },
        order,
        total,
    };

    try {
        await db.collection("orders").insertOne(orderObj);
        res.status(201).send({ message: "Pedido concluído." });
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

async function getOrders (req, res) {

    let { email } = req.headers;

    if (!email) {
        return res.status(401).send('Invalid email');
    }

    email = stripHtml(email).result;

    try {
        const orders = await db.collection("orders").find({email}).toArray();
        res.send(orders);
    } catch (error) {
        res.status(500).send(error.message);
        return;
    }
}

async function deleteOrder (req, res) {
    const orderId = stripHtml(req.params.ID_ORDER).result;

    try {
        ObjectId(orderId);
    } catch (error) {
        return res.status(422).send('Invalid id');
    }

    try {
        const order = await db.collection('orders').findOne({_id: ObjectId(orderId)});
        if (!order){
            return res.sendStatus(404);
        }
        await db.collection('orders').deleteOne({_id: ObjectId(orderId)});
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export { postOrder, getOrders, deleteOrder };