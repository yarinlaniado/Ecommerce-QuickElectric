import { createContext, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

export const ProductContext = createContext({});

export function ProductsContextProvider({ children }) {
  const [selectedProducts, setSelectedProducts] = useLocalStorageState("cart", {
    defaultValue: [],
  });
  const [total, setTotal] = useState(0);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    city: "",
    address: "",
    email: "",
  });
  const [success, setSuccess] = useState(false);

  const clearCart = async () => {
    setSelectedProducts([]);
    // setProductsInfos([]);
    localStorage.clear();
  };
  return (
    <ProductContext.Provider
      value={{
        selectedProducts,
        setSelectedProducts,
        total,
        setTotal,
        orderDetails,
        setOrderDetails,
        setSuccess,
        success,
        clearCart,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
