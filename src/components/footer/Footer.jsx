import styles from "./Footer.module.css";

const Footer = ({ list }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <nav className={styles.footerLinks} aria-label="Legal information">
          {list.map((item) => (
            <a key={item.id} className={styles.footerLink} href={item.url}>
              {item.name}
            </a>
          ))}
        </nav>
        <p className={styles.copyright}>
          © 1996-2021, Amazon.com, Inc. or its affiliates
        </p>
      </div>
    </footer>
  );
};

export default Footer;
