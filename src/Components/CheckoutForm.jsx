import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      Swal.fire("Error", "Payment confirmation failed.", "error");
    } else if (paymentIntent.status === "succeeded") {
      Swal.fire(
        "Success",
        "Payment successful with transaction ID: ",
        "success"
      );
      navigate("/dashboard/my-classes");
      setTransactionId(paymentIntent.id);
      // save payment information to the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        id: cart._id,
        classId: cart.id,
        date: new Date(),
        status: "Paid",
        itemNames: cart.title,
        itemImage: cart.image,
        itemPrices: cart.prices,
        instructorEmail: cart.instructorEmail,
        instructorName: cart.instructorName,
        seats: cart.seats,
        students: cart.students,
      };
      axiosSecure.post("/api/payments", payment).then((res) => {
        if (res.data.result.insertedId) {
          Swal.fire(
            "Success",
            "Payment successful with transaction ID: ",
            "success"
          );
        } else {
          Swal.fire("Error", "Payment failed.", "error");
        }
      });
    }

    setProcessing(false);
  };

  return (
    <>
      <form className="w-2/3 m-8" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-primary btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
    </>
  );
};

export default CheckoutForm;
