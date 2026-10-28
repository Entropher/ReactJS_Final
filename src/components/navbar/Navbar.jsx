"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import {
  House,
  ShoppingCart,
  UserRound,
  UserRoundPlus,
} from "lucide-react";
import { selectCartItemCount } from "@/app/cart/cartSlice";
import styles from "./Navbar.module.css";

const icons = {
  home: House,
  profile: UserRound,
  cart: ShoppingCart,
  login: UserRoundPlus,
};

const Navbar = ({ data }) => {
  const pathname = usePathname();
  const cartItemCount = useSelector(selectCartItemCount);

  return (
    <nav className={styles.header}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarMenu}>
          {data.map((item) => {
            const Icon = icons[item.icon];
            const isActive =
              item.url === "/"
                ? pathname === "/"
                : pathname === item.url || pathname.startsWith(`${item.url}/`);

            return (
              <div
                className={`${styles.navbarItem} ${isActive ? styles.active : ""}`}
                key={item.id}
              >
                <Link
                  href={item.url}
                  aria-current={isActive ? "page" : undefined}
                >
                  <Icon aria-hidden="true" size={30} strokeWidth={1.9} />
                  <span>{item.name}</span>
                  {item.icon === "cart" && cartItemCount > 0 && (
                    <span className={styles.cartCount} aria-label={`${cartItemCount} პროდუქტი`}>
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
