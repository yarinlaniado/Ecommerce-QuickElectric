import { model, Schema, models } from "mongoose";

const productSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  picture: String,
});
const Product = models?.Product || model("Product", productSchema);
export default Product;
