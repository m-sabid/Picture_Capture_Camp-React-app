import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";
import CheckoutForm from "../../Components/CheckoutForm";
import DashboardHeader from "../../Components/Shared/DashboardHeader";

const stripePromise = loadStripe(import.meta.env.VITE_Publishable_key);
const Payment = () => {
  const location = useLocation();
  const price = location.state.price;
  const cart = location.state;

  //   const price = parseFloat(amount.toFixed(2));

  return (
    <div>
      <DashboardHeader title={"Payment"} subtitle={"Payment page"} />
      <div className="container h-[60vh] flex flex-col justify-center">
        <Elements stripe={stripePromise}>
          <CheckoutForm price={price} cart={cart} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
