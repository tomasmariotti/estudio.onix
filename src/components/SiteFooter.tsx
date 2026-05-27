import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-40">
      <div className="container-edit py-24 grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="font-serif text-5xl md:text-7xl leading-[0.92] tracking-tight">
            Estudio<br />Onix
          </div>
          <p className="mt-6 text-sm text-muted-foreground max-w-sm">
            Arquitectura, interiorismo y reformas integrales. Espacios diseñados con
            criterio, ejecutados con detalle.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="eyebrow mb-4">Navegación</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="underline-slide">Inicio</Link></li>
            <li><Link to="/servicios" className="underline-slide">Servicios</Link></li>
            <li><Link to="/proyectos" className="underline-slide">Proyectos</Link></li>
            <li><Link to="/contacto" className="underline-slide">Contacto</Link></li>
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="eyebrow mb-4">Contacto</div>
          <ul className="space-y-2 text-sm">
            <li>{SITE.location}</li>
            <li><a className="underline-slide" href={SITE.phoneHref}>{SITE.phone}</a></li>
            <li><a className="underline-slide" href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><a className="underline-slide" href={SITE.instagram} target="_blank" rel="noreferrer">{SITE.instagramHandle}</a></li>
          </ul>
          <a
            href={SITE.calendly}
            target="_blank"
            rel="noreferrer"
            className="btn-outline inline-flex items-center mt-6 text-sm border border-foreground px-5 py-2.5 hover:bg-foreground hover:text-background"
          >
            Reservá una llamada →
          </a>
        </div>
      </div>
      <div className="container-edit py-6 border-t border-border flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Estudio Onix. Todos los derechos reservados.</span>
        <span>Ramos Mejía · Buenos Aires · Argentina</span>
      </div>
    </footer>
  );
}
