import { ProductsContextProvider } from "../components/ProductContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const initialOptions = {
    "client-id": "sb",
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <ProductsContextProvider>
        <Component {...pageProps} />
      </ProductsContextProvider>
    </PayPalScriptProvider>
  );
}
