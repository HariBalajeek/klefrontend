import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const handleCheckout = async () => {
    const res = await axios.post("http://localhost:5000/checkout", {}, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    window.location.href = res.data.url;
  };

  return (
    <div className="checkout-container">
    <h2>Checkout</h2>
    <button className="checkout-btn" onClick={handleCheckout}>Pay Now</button>
  </div>
  );
};

export default Checkout;
