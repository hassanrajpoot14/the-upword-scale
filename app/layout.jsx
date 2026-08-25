import { Inter } from "next/font/google";
import Header from "../src/components/navigation/Header";
import Footer from "../src/components/layout/Footer";
import PreloaderWrapper from "../src/components/ui/PreloaderWrapper";
import { CONTACT_INFO } from "../src/data/contactInfo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  metadataBase: new URL(CONTACT_INFO.siteUrl),
  title: "The Upward Scale | Elite Digital Growth Systems",
  description:
    "We engineer high-performance architectures, elite marketing software, and premium user interfaces that turn ambitious brands into category leaders.",
  openGraph: {
    title: "The Upward Scale | Elite Digital Growth Systems",
    description:
      "We engineer high-performance architectures, elite marketing software, and premium user interfaces that turn ambitious brands into category leaders.",
    type: "website",
    url: CONTACT_INFO.siteUrl,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <PreloaderWrapper />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
