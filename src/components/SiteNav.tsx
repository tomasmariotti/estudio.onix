import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo-onix.png";


const links = [
  { to: "/", label: "Inicio" },
  { to: "/servicios", label: "Servicios" },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/contacto", label: "Contacto" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(.16,.6,.24,1)] ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container-edit flex items-center justify-between py-5">
        <Link to="/" className="flex items-center group" aria-label="Estudio Onix">
          <img
            src={logo}
            alt="Estudio Onix"
            width={984}
            height={311}
            className="h-9 sm:h-11 md:h-14 w-auto object-contain transition-opacity duration-700 ease-[cubic-bezier(.16,.6,.24,1)] group-hover:opacity-75"
          />
        </Link>


        <ul className="hidden md:flex items-center gap-10 text-sm">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="underline-slide text-foreground/70 hover:text-foreground transition-colors duration-600 ease-[cubic-bezier(.16,.6,.24,1)]"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <a
          href={SITE.calendly}
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center gap-2 text-sm border border-foreground/60 px-5 py-2.5 hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-600 ease-[cubic-bezier(.16,.6,.24,1)]"
        >
          Agendá una asesoría
        </a>
        <button
          aria-label="Menú"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden p-2 transition-opacity duration-500 hover:opacity-70"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="container-edit py-8 flex flex-col gap-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-lg font-serif opacity-80 hover:opacity-100 transition-opacity duration-500"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm border border-foreground px-5 py-3 mt-2 w-fit hover:bg-foreground hover:text-background transition-all duration-500"
            >
              Agendá una asesoría
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
