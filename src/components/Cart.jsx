import { useState, useEffect } from "react";
import axios from "axios";
import "./Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated!");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      alert("Failed to fetch cart!");
    }
  };

  const handleRemoveFromCart = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/cart/remove",
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
      alert("Item removed from cart!");
    } catch (error) {
      console.error("Error removing item:", error);
      alert("Failed to remove item from cart!");
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">🛒 Your Cart</h2>
      {cart.length === 0 ? (
        <p className="cart-empty">Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.productId} className="cart-item">
              <p>
                {item.name} - ${item.price} x {item.quantity}
              </p>
              <button className="remove-btn" onClick={() => handleRemoveFromCart(item.productId)}>
                ❌ Remove
              </button>
            </div>
          ))}
          <h3 className="cart-total">Total: ${calculateTotal()}</h3>
        </>
      )}
    </div>
  );
};

export default Cart;
