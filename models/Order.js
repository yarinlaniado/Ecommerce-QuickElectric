import { model, Schema, models } from "mongoose";

const orderSchema = new Schema(
  {
    name: String,
    city: String,
    address: String,
    email: String,
    paymentId: String,
    total: Number,
    cart: [{ name: String, value: String, quantity: Number }],
  },
  { timestamps: true }
);
const Order = models?.Order || model("Order", orderSchema);
export default Order;
