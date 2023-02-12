import { initmongoose } from "../../lib/mongoose";
import Order from "../../models/Order";

export default async function handler(req, res) {
  console.log("req", req);
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  if (req.method === "POST") {
    initmongoose();
    const orderReq = req.body;
    const order = await Order.create({ ...orderReq });
    res.status(201).json(order);
    return order;
  }
}
