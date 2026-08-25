import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blogs", label: "Blogs" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold text-slate-900">The Upward Scale</p>
          <p className="mt-2 max-w-md text-sm text-slate-600">
            High-performance growth systems for ambitious brands.
          </p>
        </div>

        <nav className="flex flex-wrap gap-4 text-sm text-slate-600">
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-emerald-600">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
