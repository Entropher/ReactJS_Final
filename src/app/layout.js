import { Geist } from "next/font/google";
import "./globals.css";
import AppShell from "./AppShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "Fake Store",
  description: "დაათვალიერეთ პროდუქცია და მართეთ თქვენი კალათა.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ka" className={geistSans.variable}>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
