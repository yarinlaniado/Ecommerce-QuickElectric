import { PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ProductContext } from "../components/ProductContext";

/* Create after payment a success page! */

const PaypalButton = ({ cart, ids }) => {
  const router = useRouter();
  // //take apart the cart and add quantity to it depends on my ids!
  const { total, orderDetails, setSuccess, clearCart } =
    useContext(ProductContext);

  let deliveryPrice = 10;

  //paypal cart is an object that has been taken apart and constructed to be an object
  //that will work with papal buttons -> create order
  const paypalCart =
    !!cart &&
    cart.map((item) => ({
      name: `${item.name}`,
      description: `${item.description.substr(0, 20)}...`,
      unit_amount: {
        currency_code: "USD",
        value: `${item.price}`, //PRICE FOR EACH OG ITEM
      },
      quantity: ids.filter((i) => i === item._id).length,
    }));

  // Getting essential data
  const dbCart = paypalCart.map((item) => ({
    name: `${item.name}`,
    value: `${item.unit_amount.value}`,
    quantity: item.quantity,
  }));

  const orderHandler = async (details) => {
    // api insert order ,giving a cart that will be an Order schema and payment details,and later
    // inserting into mongoDB in orders document
    return await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        ...orderDetails,
        cart: [...dbCart],
        paymentId: details.id,
        total,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <PayPalButtons
      forceReRender={[total]}
      style={{
        color: "blue",
        layout: "horizontal",
        height: 40,
        tagline: false,
        shape: "pill",
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: `${total}`,
                breakdown: {
                  item_total: {
                    /* Required when including the items array */
                    currency_code: "USD",
                    value: `${total - deliveryPrice}`,
                  },
                  shipping: {
                    currency_code: "USD",
                    value: `${deliveryPrice}`,
                  },
                },
              },
              shipping: {
                options: [
                  {
                    id: "SHIP_123",
                    label: "Shipping",
                    type: "SHIPPING",
                    selected: true,
                    amount: {
                      value: `${deliveryPrice}`,
                      currency_code: "USD",
                    },
                  },

                  {
                    id: "SHIP_456",
                    label: "Pick up in Store",
                    type: "PICKUP",
                    selected: false,
                    amount: {
                      value: "0.00",
                      currency_code: "USD",
                    },
                  },
                ],
              },

              items: [...paypalCart],
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then(function (details) {
          const res = orderHandler(details);
          res.then(() => {
            clearCart();
            setSuccess(true);
            router.push("/");
          });
        });
      }}
    />
  );
};
export default PaypalButton;
