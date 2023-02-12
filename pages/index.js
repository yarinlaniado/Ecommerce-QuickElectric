import { Inter } from "@next/font/google";
import { useState } from "react";
import Layout from "../components/Layout";
import Product from "../components/product";
import { initmongoose } from "../lib/mongoose";
import { findAllProducts } from "./api/products";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products }) {
  const [phrase, setPhrase] = useState("");

  const categoriesNames = [...new Set(products.map((p) => p.category))];
  // console.log({ categoriesNames });

  if (phrase) {
    products = products.filter((p) => p.name.toLowerCase().includes(phrase));
  }

  return (
    <Layout>
      <h1 className="mb-4 text-3xl font-extrabold text-emerald-400  md:text-5xl lg:text-6xl text-center">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          QuickElectric
        </span>{" "}
      </h1>
      <h3 className="mb-4 text-2xl font-extrabold text-emerald-400  md:text-4xl lg:text-5xl text-center">
        We are here for you.
      </h3>
      <input
        type="text"
        placeholder="Search for products..."
        color="red"
        className="border-2 focus:outline-none border-emerald-400 bg-gray-100  w-full py-2 px-4 rounded-xl hover:color"
        onChange={(e) => setPhrase(e.target.value)}
      />
      <div>
        {/* showing all products and all categories, 
        and not showing empty categories after a search */}

        {categoriesNames.map((category) => (
          <div key={category}>
            {products.find((p) => p.category === category) && (
              <div>
                {" "}
                <h2 className="text-2xl font-extrabold text-emerald-400 py-5 capitalize lg:text-center">
                  {category}
                </h2>
                <div className="flex -mx-5 overflow-x-scroll snap-x scrollbar-hide">
                  {products
                    .filter((product) => product.category === category)
                    .map((productInfo) => (
                      <div key={productInfo._id} className="px-5 snap-start">
                        <Product {...productInfo} />
                      </div>
                    ))}
                </div>{" "}
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ req, res }) {
  await initmongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
