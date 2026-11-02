import "./globals.css";
import { Hind_Siliguri } from "next/font/google";

const font = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "আঞ্চলিক ট্রান্সলেটর",
  description: "মান বাংলা ও বাংলাদেশের জেলার আঞ্চলিক ভাষার মধ্যে অনুবাদ করো",
};

export const viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={font.className}>{children}</body>
    </html>
  );
}
