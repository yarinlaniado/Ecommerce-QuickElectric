import { useContext } from "react";
import { ProductContext } from "./ProductContext";
import Image from "next/image";

const loaderProp = ({ src }) => {
  return src;
};
const Product = ({ _id, name, price, description, picture }) => {
  const { setSelectedProducts } = useContext(ProductContext);
  const addProduct = () => {
    setSelectedProducts((prev) => [...prev, _id]);
  };
  return (
    <div className="w-64">
      <div className="bg-blue-100 p-5 rounded-xl">
        <Image
          src={picture}
          alt={name}
          width={500}
          height={500}
          loader={loaderProp}
        />
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-lg">{name}</h3>
      </div>
      <p className="text-sm mt-2">{description}</p>
      <div className="flex mt-1 leading-4">
        <div className="text-2xl font-bold grow">${price}</div>
        <button
          onClick={addProduct}
          className="bg-emerald-400 text-white py-1 px-3 rounded-xl"
        >
          +
        </button>
      </div>
    </div>
  );
};
export default Product;
