import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Cart.css";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [flash, setFlash] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(saved);
  }, []);

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateLocalStorage(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
      )
      .filter(item => item.quantity > 0);

    updateLocalStorage(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    updateLocalStorage(updated);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = () => {
    if (cart.length === 0) {
      triggerFlash("Your cart is empty.");
      return;
    }
    triggerFlash("Thank you for your simulated order!");
    localStorage.removeItem("cart");
    setCart([]);
  };

  const triggerFlash = (msg) => {
    setFlash(msg);
    setTimeout(() => setFlash(""), 2500);
  };

  return (
    <div className="cart-main-bg">

      {flash && <div className="flash-success">{flash}</div>}

      <div className="cart-container">
        <h1>Your Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-container">
            <p className="empty-cart">Your cart is empty.</p>
            <button className="add-items-btn" onClick={() => navigate("/browse")}>
              Add Items
            </button>
          </div>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.poster_url} className="cart-img" alt={item.title} />

              <div className="cart-details">
                <h3>{item.title}</h3>
                <p className="cart-price">₹ {item.price}</p>

                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <button className="remove-btn" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        )}

        {cart.length > 0 && (
          <div className="cart-summary">
            <h2>Total: ₹ {totalPrice}</h2>
            <button className="checkout-btn" onClick={checkout}>
              Checkout
            </button>
            <button 
              className="add-items-btn"
              onClick={() => navigate("/browse")}
            >
              Add More Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
