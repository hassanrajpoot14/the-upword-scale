import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Header from "../src/components/navigation/Header";
import Footer from "../src/components/layout/Footer";
import PreloaderWrapper from "../src/components/ui/PreloaderWrapper";
import CommandPaletteRoot from "../src/components/navigation/CommandPaletteRoot";
import BookingDrawerRoot from "../src/components/booking/BookingDrawerRoot";
import RouteProgressBar from "../src/components/navigation/RouteProgressBar";
import SmoothScroll from "../src/components/providers/SmoothScroll.jsx";
import { ThemeProvider } from "./providers";
import { CONTACT_INFO } from "../src/data/contactInfo";
import { buildPageMetadata } from "../src/lib/og/metadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL(CONTACT_INFO.siteUrl),
  ...buildPageMetadata({
    title: "The Upward Scale | Elite Digital Growth Systems",
    description:
      "We engineer high-performance architectures, elite marketing software, and premium user interfaces that turn ambitious brands into category leaders.",
    path: "/",
  }),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="overflow-x-hidden bg-slate-950 font-sans text-slate-400 antialiased transition-colors duration-300 light:bg-slate-50 light:text-slate-600 dark:bg-slate-950 dark:text-slate-400"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SmoothScroll>
            <BookingDrawerRoot>
              <CommandPaletteRoot>
                <RouteProgressBar />
                <div className="overflow-x-hidden bg-slate-950 text-slate-100 transition-colors duration-300 light:bg-slate-50 light:text-slate-900 dark:bg-slate-950 dark:text-slate-100">
                  <PreloaderWrapper />
                  <Header />
                  {children}
                  <Footer />
                </div>
              </CommandPaletteRoot>
            </BookingDrawerRoot>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
