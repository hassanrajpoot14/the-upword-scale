import Link from "next/link";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import Button from "../ui/Button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-white/80 border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center select-none">
            <span className="text-xl text-slate-900 font-normal">The</span>
            <span className="text-xl text-slate-900 font-bold ml-1.5">
              Upward
            </span>
            <span className="text-xl text-emerald-600 font-extrabold ml-1.5">
              Scale
            </span>
          </Link>

          {/* Center: Desktop Links */}
          <div className="hidden md:flex">
            <NavLinks />
          </div>

          {/* Right: CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <Link href="/contact">
                <Button variant="primary">Call Us Now</Button>
              </Link>
            </div>
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
