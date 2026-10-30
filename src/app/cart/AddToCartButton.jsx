"use client";

import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseQuantity,
  increaseQuantity,
} from "./cartSlice";
import styles from "./AddToCartButton.module.css";

export default function AddToCartButton({ product, className = "" }) {
  const dispatch = useDispatch();
  const quantity = useSelector(
    (state) =>
      state.cart.items.find((item) => item.id === product.id)?.quantity ?? 0,
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className={`${styles.control} ${className}`}>
      {quantity === 0 ? (
        <button
          className={styles.button}
          type="button"
          onClick={handleAddToCart}
          aria-label="კალათაში დამატება"
          title="კალათაში დამატება"
        >
          <ShoppingCart aria-hidden="true" size={16} />
        </button>
      ) : (
        <div className={styles.quantity} role="group" aria-label={`${product.title} რაოდენობა`}>
          <button
            type="button"
            onClick={() => dispatch(decreaseQuantity(product.id))}
            disabled={quantity <= 1}
            aria-label="რაოდენობის შემცირება"
          >
            <Minus aria-hidden="true" />
          </button>
          <output aria-live="polite">{quantity}</output>
          <button
            type="button"
            onClick={() => dispatch(increaseQuantity(product.id))}
            disabled={quantity >= 10}
            aria-label="რაოდენობის გაზრდა"
          >
            <Plus aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
