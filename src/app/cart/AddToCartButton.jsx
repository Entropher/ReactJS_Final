"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";
import styles from "./AddToCartButton.module.css";

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();
  const [wasAdded, setWasAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setWasAdded(true);
  };

  return (
    <button
      className={styles.button}
      type="button"
      onClick={handleAddToCart}
      aria-live="polite"
    >
      <ShoppingCart aria-hidden="true" size={16} />
      {wasAdded ? "კალათაში დამატებულია" : "კალათაში დამატება"}
    </button>
  );
}
