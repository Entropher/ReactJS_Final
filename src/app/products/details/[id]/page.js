import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./detail.module.css";

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  let response;

  try {
    response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      cache: "no-store",
    });
  } catch {
    response = null;
  }

  if (response?.status === 404) {
    notFound();
  }

  if (!response?.ok) {
    return (
      <main className={styles.page}>
        <Link className={styles.backLink} href="/">
          ← ყველა პროდუქტი
        </Link>
        <p className={styles.description} role="alert">
          პროდუქტის ჩატვირთვა ვერ მოხერხდა.
        </p>
      </main>
    );
  }

  const product = await response.json();

  if (!product?.id) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <Link className={styles.backLink} href="/">
        ← ყველა პროდუქტი
      </Link>
      <article className={styles.product}>
        <div className={styles.imageFrame}>
          <img src={product.image} alt={product.title} />
        </div>
        <div className={styles.details}>
          <p className={styles.category}>{product.category}</p>
          <h1>{product.title}</h1>
          <p className={styles.rating}>
            <span aria-label={`${product.rating.rate} out of 5 stars`}>
              {"★".repeat(Math.round(product.rating.rate))}
            </span>
            <span className={styles.ratingValue}>
              {product.rating.rate.toFixed(1)} / 5
            </span>
            <span className={styles.reviews}>
              {product.rating.count.toLocaleString()} reviews
            </span>
          </p>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.description}>{product.description}</p>
        </div>
      </article>
    </main>
  );
}
