import React, { useState } from "react";
import "./PaymentPage.css";

const PaymentPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setMessage("Processing payment...");

    console.log("Form data:", { name, email, amount });

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/create-checkout-session/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, amount }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Payment successful:", data);
        setMessage("Payment successful!");
      } else {
        console.error("Payment failed:", response);
        setMessage("Payment failed. Please check your details and try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }; 
  // #hello
  return (
    <div className="container">
      <h2 className="heading">Payment Portal</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
          required
        />

        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />

        <label className="label" htmlFor="amount">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input"
          required
        />

        <button
          type="submit"
          className={`button ${isProcessing ? "processingButton" : ""}`}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Pay Now"}
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

function PaymentPageFinal() {
  return (
      <div>
        <PaymentPage />
      </div>
  );
}

export default PaymentPageFinal;
