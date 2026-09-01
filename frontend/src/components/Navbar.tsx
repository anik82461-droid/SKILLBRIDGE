import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Home", href: "#top" },
    { label: "About", href: "#about" },
    { label: "Features", href: "#features" },
  ];

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm font-semibold text-slate-600 transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" size="sm">Log in</Button>
          <Button size="sm">Join platform <span className="ml-1.5">↗</span></Button>
        </div>
        <button
          type="button"
          className="rounded-lg p-2 text-slate-700 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="mx-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-float md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2 border-t border-slate-100 pt-3">
              <Button variant="outline" className="flex-1">Log in</Button>
              <Button className="flex-1">Join platform</Button>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}