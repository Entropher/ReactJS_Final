"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import styles from "./cart.module.css";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("პროდუქტების ჩატვირთვა ვერ მოხერხდა.");
        }

        return response.json();
      })
      .then((products) => {
        const clothing = products
          .filter(
            (product) =>
              product.category.toLowerCase().includes("clothing") &&
              !product.title.toLowerCase().includes("backpack"),
          )
          .slice(0, 3)
          .map((product, index) => ({
            ...product,
            quantity: index === 1 ? 2 : 1,
          }));

        setItems(clothing);
      })
      .catch(() => setError("პროდუქტების ჩატვირთვა ვერ მოხერხდა."))
      .finally(() => setIsLoading(false));
  }, []);

  const changeQuantity = (productId, amount) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.min(10, Math.max(1, item.quantity + amount)),
            }
          : item,
      ),
    );
  };

  const removeItem = (productId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  };

  return (
    <main className={styles.page}>
      <section className={styles.cart} aria-labelledby="cart-title">
        <h1 id="cart-title">კალათა</h1>

        {isLoading ? (
          <p className={styles.message}>პროდუქტები იტვირთება...</p>
        ) : error ? (
          <p className={styles.message} role="alert">
            {error}
          </p>
        ) : items.length === 0 ? (
          <p className={styles.message}>კალათა ცარიელია.</p>
        ) : (
          <>
            <div
              className={`${styles.grid} ${styles.tableHead}`}
              aria-hidden="true"
            >
              <span>პროდუქტი</span>
              <span>რაოდენობა</span>
              <span>ფასი</span>
              <span />
            </div>
            <ul className={styles.itemList}>
              {items.map((item) => (
                <li className={`${styles.grid} ${styles.item}`} key={item.id}>
                  <div className={styles.product}>
                    <img
                      className={styles.image}
                      src={item.image}
                      alt={item.title}
                    />
                    <div className={styles.productInfo}>
                      <h2>{item.title}</h2>
                      <p>{item.category}</p>
                    </div>
                  </div>
                  <div
                    className={styles.quantity}
                    aria-label={`${item.title} რაოდენობა`}
                  >
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, -1)}
                      disabled={item.quantity <= 1}
                      aria-label="რაოდენობის შემცირება"
                    >
                      <Minus aria-hidden="true" />
                    </button>
                    <output>{item.quantity}</output>
                    <button
                      type="button"
                      onClick={() => changeQuantity(item.id, 1)}
                      disabled={item.quantity >= 10}
                      aria-label="რაოდენობის გაზრდა"
                    >
                      <Plus aria-hidden="true" />
                    </button>
                  </div>
                  <p className={styles.price}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className={styles.remove}
                    type="button"
                    onClick={() => removeItem(item.id)}
                    aria-label={`${item.title} კალათიდან წაშლა`}
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </main>
  );
}
