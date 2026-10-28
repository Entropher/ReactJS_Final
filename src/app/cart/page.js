"use client";

import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus, Trash2 } from "lucide-react";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItemCount,
  selectCartItems,
  selectCartTotal,
} from "./cartSlice";
import styles from "./cart.module.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const itemCount = useSelector(selectCartItemCount);
  const total = useSelector(selectCartTotal);

  return (
    <main className={styles.page}>
      <section className={styles.cart} aria-labelledby="cart-title">
        <h1 id="cart-title">კალათა</h1>

        {items.length === 0 ? (
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
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      disabled={item.quantity <= 1}
                      aria-label="რაოდენობის შემცირება"
                    >
                      <Minus aria-hidden="true" />
                    </button>
                    <output>{item.quantity}</output>
                    <button
                      type="button"
                      onClick={() => dispatch(increaseQuantity(item.id))}
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
                    onClick={() => dispatch(removeFromCart(item.id))}
                    aria-label={`${item.title} კალათიდან წაშლა`}
                  >
                    <Trash2 aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
            <section className={styles.summary} aria-label="კალათის შეჯამება">
              <p>პროდუქტების რაოდენობა: {itemCount}</p>
              <p>
                ჯამური გადასახადი: <strong>${total.toFixed(2)}</strong>
              </p>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
