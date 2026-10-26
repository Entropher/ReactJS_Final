"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";

const navbarItems = [
  { id: 1, name: "Home", url: "/", icon: "home" },
  { id: 2, name: "Profile", url: "/profile", icon: "profile" },
  { id: 3, name: "Cart", url: "/cart", icon: "cart" },
  { id: 4, name: "Login", url: "/login", icon: "login" },
];

const footerItems = [
  { id: 1, name: "Conditions of Use", url: "/conditions-of-use" },
  { id: 2, name: "Privacy Notice", url: "/privacy" },
  { id: 3, name: "Interest-Based Ads", url: "/interest-based-ads" },
];

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return children;
  }

  return (
    <>
      <Navbar data={navbarItems} />
      {children}
      <Footer list={footerItems} />
    </>
  );
}
