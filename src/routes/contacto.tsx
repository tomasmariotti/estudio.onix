import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";
import { ArrowUpRight, Mail, MapPin, Phone, Instagram, Calendar } from "lucide-react";

export const Route = createFileRoute("/contacto")({ component: Contacto });

function Contacto() {
  const [submitting, setSubmitting] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      window.open(SITE.calendly, "_blank", "noopener");
      setSubmitting(false);
    }, 500);
  };
  const field =
    "w-full bg-transparent border-b border-border py-4 text-base placeholder:text-muted-foreground/70 focus:outline-none focus:border-foreground transition-colors";

  return (
    <div className="bg-background text-foreground">
      <SiteNav />
      <header className="container-edit pt-40 md:pt-48 pb-16">
        <Reveal>
          <div className="eyebrow mb-6">Contacto</div>
          <h1 className="font-serif text-5xl md:text-8xl leading-[0.95] tracking-tight max-w-5xl">
            Hablemos de tu <span className="italic">próximo espacio</span>.
          </h1>
        </Reveal>
      </header>

      <section className="container-edit grid md:grid-cols-12 gap-12 pb-20">
        <aside className="md:col-span-4 space-y-10">
          <Reveal>
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between gap-4 border border-foreground p-6 hover:bg-foreground hover:text-background transition-colors"
            >
              <span>
                <span className="eyebrow opacity-70">Camino más rápido</span>
                <span className="block font-serif text-2xl mt-2">Reservá una llamada</span>
              </span>
              <Calendar size={20} />
            </a>
          </Reveal>

          <Reveal delay={120}>
            <ul className="space-y-6 text-sm">
              <li className="flex gap-4">
                <MapPin size={18} className="mt-0.5 shrink-0 text-muted-foreground" />
                <div>
                  <div className="eyebrow mb-1">Estudio</div>
                  {SITE.location}
                </div>
              </li>
              <li className="flex gap-4">
                <Phone size={18} className="mt-0.5 shrink-0 text-muted-foreground" />
                <div>
                  <div className="eyebrow mb-1">Teléfono</div>
                  <a href={SITE.phoneHref} className="underline-slide">{SITE.phone}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <Mail size={18} className="mt-0.5 shrink-0 text-muted-foreground" />
                <div>
                  <div className="eyebrow mb-1">Email</div>
                  <a href={`mailto:${SITE.email}`} className="underline-slide">{SITE.email}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <Instagram size={18} className="mt-0.5 shrink-0 text-muted-foreground" />
                <div>
                  <div className="eyebrow mb-1">Instagram</div>
                  <a href={SITE.instagram} target="_blank" rel="noreferrer" className="underline-slide">{SITE.instagramHandle}</a>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <div className="border-t border-border pt-8">
              <div className="eyebrow mb-3">Horario</div>
              <p className="text-sm">{SITE.hours.weekdays}</p>
              <p className="text-sm">{SITE.hours.saturday}</p>
            </div>
          </Reveal>
        </aside>

        <form onSubmit={onSubmit} className="md:col-span-8 grid md:grid-cols-2 gap-x-8 gap-y-2 md:pl-10">
          <input required name="nombre" placeholder="Nombre y apellido" className={field} />
          <input required type="email" name="email" placeholder="Email" className={field} />
          <input required type="tel" name="telefono" placeholder="Teléfono" className={field} />
          <input required name="ubicacion" placeholder="Ubicación" className={field} />
          <select required name="tipo" defaultValue="" className={field}>
            <option value="" disabled>Tipo de proyecto</option>
            <option>Vivienda</option>
            <option>Cocina o baño</option>
            <option>Oficina</option>
            <option>Local comercial</option>
            <option>Reforma integral</option>
            <option>Obra nueva</option>
          </select>
          <input required name="metros" placeholder="Metros aproximados" className={field} />
          <select required name="presupuesto" defaultValue="" className={field}>
            <option value="" disabled>Presupuesto estimado (USD)</option>
            <option>Hasta 15.000</option>
            <option>15.000 – 40.000</option>
            <option>40.000 – 100.000</option>
            <option>Más de 100.000</option>
          </select>
          <input required name="inicio" placeholder="Fecha aproximada de inicio" className={field} />
          <textarea required name="objetivo" rows={2} placeholder="Objetivo principal del proyecto" className={`${field} md:col-span-2 resize-none`} />
          <textarea name="referencias" rows={2} placeholder="Referencias o inspiración (opcional)" className={`${field} md:col-span-2 resize-none`} />
          <div className="md:col-span-2 mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-xs text-muted-foreground max-w-md">
              Al enviar serás redirigido a nuestro calendario para reservar tu llamada estratégica.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 text-sm hover:bg-foreground/85 transition-colors disabled:opacity-60"
            >
              {submitting ? "Enviando…" : "Enviar y reservar llamada"}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </form>
      </section>

      <SiteFooter />
    </div>
  );
}
