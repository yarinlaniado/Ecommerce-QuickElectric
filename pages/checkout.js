import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import PaypalButton from "../components/PaypalButton";
import { ProductContext } from "../components/ProductContext";

export default function CheckoutPage() {
  const {
    selectedProducts,
    setSelectedProducts,
    total,
    setTotal,
    orderDetails,
    setOrderDetails,
    clearCart,
  } = useContext(ProductContext);

  const [productsInfos, setProductsInfos] = useState([]);
  // const [address, setAddress] = useState("");
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [city, setCity] = useState("");

  const isEmpty = () => {
    for (let key in orderDetails) {
      if (orderDetails[key] === null || orderDetails[key] === "") return true;
    }
    return false;
  };

  useEffect(() => {
    const uniqeIds = [...new Set(selectedProducts)];
    fetch("/api/products?ids=" + uniqeIds.join(","))
      .then((res) => res.json())
      .then((json) => setProductsInfos(json));
  }, [selectedProducts]);

  const addProduct = (id) => {
    setSelectedProducts((prev) => [...prev, id]);
  };
  const minusOneProduct = (id) => {
    const pos = selectedProducts.indexOf(id);
    // let clearFlag = false;
    // if (selectedProducts.length === 1) clearFlag = true;
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  };

  let deliveryPrice = 10;
  let subTotal = 0;
  if (selectedProducts?.length && Object.keys(productsInfos).length !== 0) {
    subTotal = 0;
    for (let id of selectedProducts) {
      const price = productsInfos.find((p) => p._id === id)?.price || 0;
      subTotal += price;
    }
  }
  setTotal(subTotal + deliveryPrice);

  return (
    <Layout>
      {!productsInfos.length && (
        <div>No products in your shopping card, feel free to add!</div>
      )}
      {productsInfos.length &&
        productsInfos.map((productInfo) => {
          const amount = selectedProducts.filter(
            (id) => id === productInfo._id
          ).length;
          if (amount === 0) return;
          return (
            <div className="flex mb-5 " key={productInfo._id}>
              <div className="bg-gray-100 p-3 rounded-xl shrink-0">
                <img
                  className="w-24"
                  src={productInfo.picture}
                  alt={productInfo.name}
                />
              </div>
              <div className="pl-4">
                <h3 className="font-bold text-lg">{productInfo.name}</h3>
                <p className="text-sm leading-4 text-gray-500">
                  {productInfo.description}
                </p>
                <div className="flex">
                  <div className="grow">${productInfo.price}</div>
                  <div>
                    <button
                      onClick={() => minusOneProduct(productInfo._id)}
                      className="border border-emerald-500 px-2 rounded-lg text-emerald-500"
                    >
                      -
                    </button>
                    <span className="px-5">
                      {
                        selectedProducts.filter((id) => id === productInfo._id)
                          .length
                      }
                    </span>

                    <button
                      onClick={() => addProduct(productInfo._id)}
                      className="bg-emerald-500 px-2 rounded-lg text-white"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <button
        onClick={() => clearCart()}
        className="float-right bg-emerald-500 px-5 py-2 text-white grow rounded-xl my-4 shadow-xl font-bold transition-all hover:shadow-emerald-200 duration-[250ms] ease-out group-hover:w-full"
      >
        Clear
      </button>
      <div className="mt-4">
        {isEmpty() && <p color="emerald-500">Please fill all fields!</p>}
        <input
          onChange={(e) =>
            setOrderDetails((prev) => ({ ...prev, name: e.target.value }))
          }
          value={orderDetails.name}
          className="bg-gray 100 w-full rounded-lg px-4 py-2 mb-2"
          type="text"
          placeholder="Full Name"
        />
        <input
          onChange={(e) => {
            setOrderDetails((prev) => ({ ...prev, address: e.target.value }));
          }}
          value={orderDetails.address}
          className="bg-gray 100 w-full rounded-lg px-4 py-2 mb-2"
          type="text"
          placeholder="Street Address, Number"
        />
        <input
          onChange={(e) =>
            setOrderDetails((prev) => ({ ...prev, city: e.target.value }))
          }
          value={orderDetails.city}
          className="bg-gray 100 w-full rounded-lg px-4 py-2 mb-2"
          type="text"
          placeholder="City & Postal Code"
        />
        <input
          onChange={(e) =>
            setOrderDetails((prev) => ({ ...prev, email: `${e.target.value}` }))
          }
          value={orderDetails.email}
          className="bg-gray 100 w-full rounded-lg px-4 py-2 mb-2"
          type="email"
          placeholder="Email address"
        />
        <div className="mt-4">
          <div className="flex my-3 ">
            <h3 className="grow font-bold text-gray-400">Subtotal:</h3>
            <h3 className="font-bold">${subTotal}</h3>
          </div>
          <div className="flex my-3 ">
            <h3 className="grow font-bold text-gray-400">Delivery:</h3>
            <h3 className="font-bold">${deliveryPrice}</h3>
          </div>
          <div className="flex my-3 border-t border-dashed pt-3 border-emerald-500 ">
            <h3 className="grow font-bold text-gray-400">Total:</h3>
            <h3 className="font-bold">${total}</h3>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-2 ">
        {productsInfos.length && !isEmpty() && (
          <PaypalButton
            cart={productsInfos}
            ids={selectedProducts}
            orderDetails={orderDetails}
          />
        )}
      </div>
    </Layout>
  );
}
