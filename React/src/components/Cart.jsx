import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  clearCart,
  removeItem,
  updateQuantity,
} from "../store/slices/cartSlice";

const products = [
  { id: 1, name: "Adidas Shoes", price: 1000 },
  { id: 2, name: "Nike Shoes", price: 1200 },
  { id: 3, name: "Puma Shoes", price: 900 },
];

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // 🧠 total calculation
  const total = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cart]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart Items</h1>

      {/* 🛍️ Product List */}
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product.id}>
          {product.name} - ₹{product.price}
          <button onClick={() => dispatch(addItem(product))}>Add</button>
        </div>
      ))}

      {/* 🛒 Cart */}
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id} style={{ marginTop: "10px" }}>
                {item.name} - ₹{item.price} × {item.quantity}
                {/* ➕ Increase */}
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      }),
                    )
                  }
                >
                  +
                </button>
                {/* ➖ Decrease */}
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: Math.max(1, item.quantity - 1),
                      }),
                    )
                  }
                >
                  -
                </button>
                {/* ❌ Remove */}
                <button onClick={() => dispatch(removeItem(item))}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* 💰 Total */}
          <h3>Total: ₹{total}</h3>

          {/* 🧹 Clear */}
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
