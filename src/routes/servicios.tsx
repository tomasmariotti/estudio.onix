import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { Reveal } from "@/components/Reveal";
import { SITE } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

import imgBedroom from "@/assets/proj-01-bedroom.png";
import imgFacade from "@/assets/proj-02-facade.png";
import imgShower from "@/assets/proj-08-shower.png";
import imgMarble from "@/assets/proj-07-marble.png";
import imgReforma from "@/assets/proj-05-reforma.png";
import imgAtrium from "@/assets/proj-04-atrium.png";

export const Route = createFileRoute("/servicios")({ component: Servicios });

const services = [
  {
    n: "01",
    t: "Arquitectura e interiorismo",
    d: "Diseño integral con visión contemporánea. Trabajamos cada proyecto desde el concepto hasta la última terminación, integrando arquitectura y atmósfera interior.",
    benefits: ["Concepto y dirección creativa", "Diseño técnico y constructivo", "Materialidad e iluminación"],
    img: imgFacade,
  },
  {
    n: "02",
    t: "Reformas integrales",
    d: "Transformamos viviendas, locales y oficinas en espacios modernos, funcionales y bien resueltos. Una sola coordinación, un solo responsable.",
    benefits: ["Coordinación integral", "Cronograma claro y plazos cumplidos", "Acabados de alta calidad"],
    img: imgReforma,
  },
  {
    n: "03",
    t: "Optimización y planificación espacial",
    d: "Replanteamos la distribución para ganar superficie útil, luz natural y conexión entre ambientes sin comprometer la estética.",
    benefits: ["Mejor aprovechamiento del m²", "Circulaciones claras", "Funcionalidad cotidiana"],
    img: imgBedroom,
  },
  {
    n: "04",
    t: "Dirección de obra",
    d: "Llevamos adelante la obra con foco en calidad, plazos y presupuesto. Coordinamos a todos los gremios bajo una misma visión.",
    benefits: ["Control técnico y estético", "Gestión de proveedores", "Reportes y seguimiento"],
    img: imgAtrium,
  },
  {
    n: "05",
    t: "Cocinas y baños",
    d: "Espacios donde la materialidad y la iluminación se vuelven protagonistas. Diseñamos cocinas y baños con identidad propia.",
    benefits: ["Diseño a medida", "Selección de materiales premium", "Iluminación arquitectónica"],
    img: imgShower,
  },
  {
    n: "06",
    t: "Asesoramiento estético y funcional",
    d: "Una consultoría focalizada para clientes que quieren tomar mejores decisiones antes o durante una obra.",
    benefits: ["Diagnóstico del espacio", "Paleta y materiales", "Plan de acción claro"],
    img: imgMarble,
  },
];

function Servicios() {
  return (
    <div className="bg-background text-foreground">
      <SiteNav />
      <header className="container-edit pt-40 md:pt-48 pb-20 md:pb-28">
        <Reveal>
          <div className="eyebrow mb-6">Servicios</div>
          <h1 className="font-serif text-5xl md:text-8xl leading-[0.95] tracking-tight max-w-5xl">
            Un servicio <span className="italic">integral</span>, una sola visión.
          </h1>
          <p className="mt-10 max-w-xl text-muted-foreground leading-relaxed">
            Diseño, planificación, dirección y ejecución. Todo coordinado por el estudio
            para garantizar coherencia estética, técnica y temporal.
          </p>
        </Reveal>
      </header>

      <div className="border-t border-border">
        {services.map((s, i) => (
          <section key={s.n} className="border-b border-border">
            <div className="container-edit py-20 md:py-32 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
              <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                <Reveal>
                  <div className="img-hover aspect-[4/5] bg-muted">
                    <img src={s.img} alt={s.t} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                </Reveal>
              </div>
              <div className="md:col-span-6">
                <Reveal>
                  <div className="eyebrow mb-6">{s.n}</div>
                  <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight">{s.t}</h2>
                  <p className="mt-8 text-muted-foreground leading-relaxed max-w-lg">{s.d}</p>
                  <ul className="mt-10 space-y-3 max-w-md">
                    {s.benefits.map((b) => (
                      <li key={b} className="grid grid-cols-[auto_1fr] gap-4 items-baseline border-t border-border pt-3">
                        <span className="eyebrow text-muted-foreground">·</span>
                        <span className="text-sm">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={SITE.calendly}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-10 inline-flex items-center gap-2 text-sm underline-slide"
                  >
                    Consultar este servicio <ArrowUpRight size={14} />
                  </a>
                </Reveal>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="container-edit py-28 md:py-40 text-center">
        <Reveal>
          <h2 className="font-serif text-4xl md:text-6xl leading-[1] tracking-tight max-w-3xl mx-auto">
            ¿Listo para <span className="italic">comenzar</span>?
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noreferrer"
              className="btn-primary group inline-flex items-center gap-2 bg-foreground text-background px-7 py-4 text-sm hover:bg-foreground/85"
            >
              Agendá una asesoría <ArrowUpRight size={16} className="transition-transform duration-700 ease-[cubic-bezier(.16,.6,.24,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link to="/proyectos" className="inline-flex items-center gap-2 text-sm underline-slide">
              Ver proyectos
            </Link>
          </div>
        </Reveal>
      </section>

      <SiteFooter />
    </div>
  );
}
