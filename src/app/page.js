"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [deletedProducts, setDeletedProducts] = useState([]);
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
      .then((result) => setProducts(result.slice(0, 20)))
      .catch(() => setError("პროდუქტების ჩატვირთვა ვერ მოხერხდა."))
      .finally(() => setIsLoading(false));
  }, []);

  const deleteProduct = (productId) => {
    const deletedProduct = products.find((product) => product.id === productId);

    if (!deletedProduct) {
      return;
    }

    setDeletedProducts((currentDeletedProducts) => [
      ...currentDeletedProducts,
      deletedProduct,
    ]);
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    );
  };

  const restoreProduct = (productId) => {
    const restoredProduct = deletedProducts.find(
      (product) => product.id === productId,
    );

    if (!restoredProduct) {
      return;
    }

    setProducts((currentProducts) => [...currentProducts, restoredProduct]);
    setDeletedProducts((currentDeletedProducts) =>
      currentDeletedProducts.filter((product) => product.id !== productId),
    );
  };

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <header className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>FAKE STORE</p>
            <h1>პროდუქტები</h1>
          </div>
          {!isLoading && !error && (
            <p className={styles.count}>{products.length} პროდუქტი</p>
          )}
        </header>

        {isLoading ? (
          <p className={styles.message}>პროდუქტები იტვირთება...</p>
        ) : error ? (
          <p className={styles.message} role="alert">
            {error}
          </p>
        ) : products.length === 0 ? (
          <p className={styles.message}>პროდუქტები სიაში აღარ არის.</p>
        ) : (
          <ul className={styles.productList}>
            {products.map((product) => (
              <li className={styles.product} key={product.id}>
                <Link
                  className={styles.productLink}
                  href={`/products/details/${product.id}`}
                  aria-label={`${product.title} - დეტალები`}
                >
                  <div className={styles.imageFrame}>
                    <img
                      className={styles.image}
                      src={product.image}
                      alt={product.title}
                    />
                  </div>
                </Link>
                <div className={styles.productInfo}>
                  <p className={styles.shipping}>Ships to Georgia</p>
                  <p className={styles.category}>{product.category}</p>
                  <h2 className={styles.productTitle}>
                    <Link href={`/products/details/${product.id}`}>
                      {product.title}
                    </Link>
                  </h2>
                  <p className={styles.rating}>
                    <span aria-label={`${product.rating.rate} out of 5 stars`}>
                      {"★".repeat(Math.round(product.rating.rate))}
                    </span>
                    <span className={styles.reviewCount}>
                      {product.rating.count.toLocaleString()} reviews
                    </span>
                  </p>
                  <div className={styles.productFooter}>
                    <p className={styles.price}>${product.price.toFixed(2)}</p>
                    <Link
                      className={styles.detailsLink}
                      href={`/products/details/${product.id}`}
                    >
                      დეტალები
                    </Link>
                    <button
                      className={styles.deleteButton}
                      type="button"
                      onClick={() => deleteProduct(product.id)}
                      aria-label={`${product.title} - წაშლა`}
                    >
                      წაშლა
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {deletedProducts.length > 0 && (
        <section className={styles.deletedSection}>
          <div className={styles.content}>
            <header className={styles.deletedHeading}>
              <h2>წაშლილი პროდუქტები</h2>
              <p className={styles.count}>{deletedProducts.length} პროდუქტი</p>
            </header>
            <ul className={styles.productList}>
              {deletedProducts.map((product) => (
                <li
                  className={`${styles.product} ${styles.deletedProduct}`}
                  key={product.id}
                >
                  <div className={styles.imageFrame}>
                    <img
                      className={styles.image}
                      src={product.image}
                      alt={product.title}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <p className={styles.category}>{product.category}</p>
                    <h3 className={styles.productTitle}>{product.title}</h3>
                    <div className={styles.productFooter}>
                      <p className={styles.price}>
                        ${product.price.toFixed(2)}
                      </p>
                      <button
                        className={styles.restoreButton}
                        type="button"
                        onClick={() => restoreProduct(product.id)}
                        aria-label={`${product.title} - დაბრუნება`}
                      >
                        დაბრუნება
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
