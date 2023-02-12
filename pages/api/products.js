import { initmongoose } from "../../lib/mongoose";
import Product from "../../models/product";

export async function findAllProducts() {
  return Product.find().exec();
}
const handle = async (req, res) => {
  await initmongoose();
  const { ids } = req.query;
  if (ids) {
    const idsArray = ids.split(",");
    res.json(await Product.find({ _id: { $in: idsArray } }).exec());
  } else res.json({});
};

export default handle;
