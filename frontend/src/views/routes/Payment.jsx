import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, redirect } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useParams } from "react-router-dom";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import "./Payment.css";

const stripePromise = loadStripe(
  "pk_test_51QFzYyHH43Q0yRB555Wz4VOQnfH1JdDeazmNBOOfG9s53j6NOuIC9RTreaFe2lGGh31C7opLoYomj8du5EFbqr7B00zQZR4LS1"
);
//wrapping PaymentForm and managing payment states.
function PaymentForm({amount, name}) {

  // const {amount, name, email} = {params}

  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || {};

  const [data, setData] = useState({name: name, amount: amount})

  useEffect(()=>{
    console.log(data)
  },[])

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    console.log("Hello Payment")
    event.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(
        "http://127.0.0.1:8000/api/create-checkout-session/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name , amount }),
        }
      );
      console.log("Received response from API", res);
      const { id } = await res.json();

      const { error } = await stripe.redirectToCheckout({ sessionId: id });

      if (error) {
        console.error(error);
      }
      setLoading(false);
    } catch (err) {
        console.log(err)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2 className="heading">Complete Your Payment</h2>
      {/* <p className="description">Please enter your payment details below.</p> */}
      <button type="button" onClick={()=>navigate("/")}>
        Go to Home
      </button>

      {/* <div className="cardElementWrapper">
        <CardElement options={{ style: cardElementStyles }} />
      </div> */}

      <button className="button" disabled={!stripe || loading} type="submit">
        {loading ? "Processing…" : "Pay Now"}
      </button>
    </form>
  );
}

function Payment() {
  const{ paymentInfo } = useParams();

  const paymentFinal = JSON.parse(decodeURIComponent(paymentInfo))

  return (
    <Elements stripe={stripePromise}>
      <div className="page">
        <PaymentForm amount={paymentFinal.amount} name={paymentFinal.title} />
      </div>
    </Elements>
  );
}

export default Payment;

const cardElementStyles = {
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
};
